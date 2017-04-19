'use strict';

module.exports = {
    entry: {
        sharepointdata:'./src/main.tsx',
        bundle:'./src/reactstart.tsx'
    },
    output: { filename: './dist/[name].js' },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'sp-pnp-js': '$pnp'
    }
};