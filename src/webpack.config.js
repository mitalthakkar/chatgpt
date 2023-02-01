
module.exports = {


    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: 'defaults' }]],
                    },
                },
            },
        ],
    },
    entry: {
        app: './app.js',
        vendor: ['react', 'react-dom', 'react-router'],
    },
};
