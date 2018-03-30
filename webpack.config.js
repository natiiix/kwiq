module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    output: {
        path: __dirname,
        filename: 'dist/app.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader'
        }]
    }
}
