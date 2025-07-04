# Tests del Portfolio

Este directorio contiene los tests unitarios y de integración para el portfolio de Emilio Funes.

## 🧪 Estructura de Tests

```
__tests__/
├── components/          # Tests de componentes React
│   └── Hero.test.tsx   # Tests del componente Hero
├── context/            # Tests de contextos
│   └── PreferencesContext.test.tsx
├── lib/                # Tests de utilidades
│   └── seo.test.ts     # Tests de utilidades SEO
└── README.md           # Esta documentación
```

## 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (desarrollo)
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📊 Cobertura de Tests

Los tests cubren:

### Componentes
- ✅ **Hero**: Renderizado, enlaces, contenido dinámico
- 🔄 **Stack**: Tecnologías mostradas correctamente
- 🔄 **Projects**: Lista de proyectos y enlaces
- 🔄 **Contact**: Formulario y validaciones

### Contextos
- ✅ **PreferencesContext**: Manejo de idioma y tema oscuro/claro
- ✅ Persistencia en localStorage
- ✅ Detección de preferencias del sistema

### Utilidades
- ✅ **SEO**: Generación de metadatos y structured data
- ✅ Configuración multi-idioma
- ✅ Open Graph y Twitter Cards

## 🎯 Próximos Tests a Implementar

### Componentes
- [ ] `Stack.test.tsx` - Verificar tecnologías mostradas
- [ ] `Projects.test.tsx` - Verificar proyectos y enlaces
- [ ] `Contact.test.tsx` - Verificar formulario
- [ ] `Navbar.test.tsx` - Verificar navegación
- [ ] `Footer.test.tsx` - Verificar enlaces

### Hooks
- [ ] `useActiveSection.test.ts` - Verificar detección de sección activa
- [ ] `useSmoothScroll.test.ts` - Verificar scroll suave

### Integración
- [ ] `page.test.tsx` - Verificar página completa
- [ ] `layout.test.tsx` - Verificar layout principal

## 🔧 Configuración

### Jest
- Configurado para Next.js con TypeScript
- Mocks para Framer Motion, Next.js Image, Vercel Analytics
- Configuración de cobertura al 70%

### Testing Library
- React Testing Library para tests de componentes
- Jest DOM para matchers adicionales
- User Event para simulación de interacciones

## 📝 Convenciones

1. **Nombres de archivos**: `ComponentName.test.tsx`
2. **Descripción de tests**: Usar `describe` para agrupar tests relacionados
3. **Casos de prueba**: Usar `it` con descripciones claras
4. **Assertions**: Usar `expect` con matchers específicos
5. **Setup**: Usar `beforeEach` para configuración común

## 🐛 Debugging

Para debuggear tests:

```bash
# Ejecutar un test específico
npm test -- --testNamePattern="Hero Component"

# Ejecutar con más verbosidad
npm test -- --verbose

# Ejecutar tests de un archivo específico
npm test -- Hero.test.tsx
```

## 📈 Métricas de Calidad

- **Cobertura mínima**: 70%
- **Tests por componente**: Al menos 3-5 casos de prueba
- **Tests de integración**: Para flujos críticos
- **Performance**: Tests deben ejecutarse en < 30 segundos 