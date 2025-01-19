import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import path from 'path';
import alias from '@rollup/plugin-alias';
import postcss from 'rollup-plugin-postcss';

const projectRootDir = path.resolve(process.cwd());

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      globals: {
        'pdfmake/build/pdfmake': 'pdfMake',
        'pdfmake/build/vfs_fonts': 'pdfMakeFonts'
      }
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      globals: {
        'pdfmake/build/pdfmake': 'pdfMake',
        'pdfmake/build/vfs_fonts': 'pdfMakeFonts'
      }
    },
  ],
  external: [
    'react',
    'react-dom',
    '@onedoc/react-print',
    '@react-pdf/renderer',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@tinymce/tinymce-react',
    'blob-stream',
    'draft-js',
    'highlight.js',
    'html-to-pdfmake',
    'html2canvas',
    'html2pdf.js',
    'jspdf',
    'jspdf-autotable',
    'jspdf-html2canvas',
    'pdfmake',
    'pdfmake/build/pdfmake',
    'pdfmake/build/vfs_fonts',
    'quill-emoji',
    'quill-image-resize-module-ts',
    'quill-table',
    'react-icons',
    'react-modal',
    'react-quill',
    'slate',
    'slate-react',
    'uuid',
    'web-vitals'
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        { find: 'styles', replacement: path.resolve(projectRootDir, 'src/styles') },
        { find: 'components', replacement: path.resolve(projectRootDir, 'src/components') },
        { find: 'interface', replacement: path.resolve(projectRootDir, 'src/interface') },
        { find: 'lib', replacement: path.resolve(projectRootDir, 'src/lib') },
        { find: 'mocks', replacement: path.resolve(projectRootDir, 'src/mocks') },
        { find: 'utils', replacement: path.resolve(projectRootDir, 'src/utils') }
      ]
    }),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: true,
      moduleDirectories: ['node_modules', 'src']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/__tests__/**', '**/*.test.tsx', '**/*.stories.tsx']
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: true
    }),
    json(),
    terser()
  ]
};
