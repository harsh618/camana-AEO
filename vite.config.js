import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Export an async config so we can optionally load @base44/vite-plugin
export default defineConfig(async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  let base44Plugin = null
  try {
    const mod = await import('@base44/vite-plugin')
    const factory = mod && (mod.default || mod)
    if (typeof factory === 'function') {
      base44Plugin = factory({
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
        hmrNotifier: true,
        navigationNotifier: true,
        visualEditAgent: true,
      })
    }
  } catch (err) {
    // Optional plugin missing — continue without it. This allows building on environments
    // where @base44/vite-plugin is not installed or not available.
    // eslint-disable-next-line no-console
    console.warn('Optional @base44/vite-plugin not found — continuing without it')
  }

  return {
    logLevel: 'error', // Suppress warnings, only show errors
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      ...(base44Plugin ? [base44Plugin] : []),
      react(),
    ],
  }
})
