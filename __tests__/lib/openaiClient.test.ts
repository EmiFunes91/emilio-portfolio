import { getChatResponse } from '../../lib/openaiClient'

// Mock de fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock de process.env
const originalEnv = process.env

describe('openaiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('hace una llamada exitosa a la API de OpenAI', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Esta es una respuesta de prueba'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key'

    const result = await getChatResponse('Hola, ¿cómo estás?')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Hola, ¿cómo estás?' }],
          max_tokens: 100,
          temperature: 0.7
        })
      }
    )

    expect(result).toBe('Esta es una respuesta de prueba')
  })

  it('maneja errores de respuesta no exitosa', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key'

    await expect(getChatResponse('Test message')).rejects.toThrow(
      'Error al obtener respuesta de OpenAI'
    )

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-api-key'
        })
      })
    )
  })

  it('maneja errores de red', async () => {
    const networkError = new Error('Network error')
    mockFetch.mockRejectedValueOnce(networkError)

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key'

    await expect(getChatResponse('Test message')).rejects.toThrow('Network error')
  })

  it('usa la API key del environment variable', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Respuesta de prueba'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'mi-api-key-secreta'

    await getChatResponse('Test message')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer mi-api-key-secreta'
        })
      })
    )
  })

  it('envía el mensaje correcto en el body', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Respuesta'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    const testMessage = 'Este es un mensaje de prueba muy largo'
    await getChatResponse(testMessage)

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: testMessage }],
          max_tokens: 100,
          temperature: 0.7
        })
      })
    )
  })

  it('maneja respuestas con múltiples choices', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Primera respuesta'
          }
        },
        {
          message: {
            content: 'Segunda respuesta'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    const result = await getChatResponse('Test message')

    expect(result).toBe('Primera respuesta')
  })

  it('maneja respuestas vacías', async () => {
    const mockResponse = {
      choices: []
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow()
  })

  it('maneja respuestas con choices sin message', async () => {
    const mockResponse = {
      choices: [
        {
          // Sin message
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow()
  })

  it('maneja respuestas con message sin content', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            // Sin content
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    const result = await getChatResponse('Test message')

    expect(result).toBeUndefined()
  })

  it('usa los parámetros correctos del modelo', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Respuesta'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await getChatResponse('Test message')

    const callArgs = mockFetch.mock.calls[0][1]
    const body = JSON.parse(callArgs.body)

    expect(body.model).toBe('gpt-3.5-turbo')
    expect(body.max_tokens).toBe(100)
    expect(body.temperature).toBe(0.7)
  })

  it('maneja mensajes con caracteres especiales', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Respuesta con caracteres especiales: áéíóú ñ'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    const specialMessage = 'Mensaje con caracteres especiales: áéíóú ñ'
    const result = await getChatResponse(specialMessage)

    expect(result).toBe('Respuesta con caracteres especiales: áéíóú ñ')
  })

  it('maneja mensajes muy largos', async () => {
    const longMessage = 'A'.repeat(1000)
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Respuesta para mensaje largo'
          }
        }
      ]
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    const result = await getChatResponse(longMessage)

    expect(result).toBe('Respuesta para mensaje largo')
  })

  it('maneja errores de JSON parsing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      }
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow('Invalid JSON')
  })

  it('maneja errores de timeout', async () => {
    const timeoutError = new Error('Request timeout')
    timeoutError.name = 'AbortError'
    mockFetch.mockRejectedValueOnce(timeoutError)

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow('Request timeout')
  })

  it('maneja errores de autenticación', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'invalid-key'

    await expect(getChatResponse('Test message')).rejects.toThrow(
      'Error al obtener respuesta de OpenAI'
    )
  })

  it('maneja errores de rate limit', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests'
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow(
      'Error al obtener respuesta de OpenAI'
    )
  })

  it('maneja errores de servidor', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    })

    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key'

    await expect(getChatResponse('Test message')).rejects.toThrow(
      'Error al obtener respuesta de OpenAI'
    )
  })
}) 