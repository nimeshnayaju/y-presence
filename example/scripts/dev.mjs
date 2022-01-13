/* eslint-disable no-undef */
import esbuildServe from 'esbuild-serve'
import fs from 'fs'

const { log: jslog } = console

async function main() {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
  }

  fs.copyFile('./src/index.html', './dist/index.html', (err) => {
    if (err) throw err
  })

  try {
    await esbuildServe(
      {
        entryPoints: ['src/index.tsx'],
        outfile: 'dist/bundle.js',
        bundle: true,
        minify: false,
        sourcemap: true,
        incremental: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
        define: {
          'process.env.NODE_ENV': '"development"',
        },
        watch: {
          onRebuild(err) {
            err ? error('❌ Failed') : jslog('✅ Updated')
          },
        },
      },
      {
        port: 5420,
        root: './dist',
        live: true,
      }
    )
  } catch (err) {
    process.exit(1)
  }
}

main()