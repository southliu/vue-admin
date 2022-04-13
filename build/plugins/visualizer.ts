import { visualizer } from 'rollup-plugin-visualizer'

export function configVisualizerConfig() {
  return visualizer({
    gzipSize: true,
    brotliSize: true,
  })
}
