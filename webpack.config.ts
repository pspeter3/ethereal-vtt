import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import TerserJSPlugin from "terser-webpack-plugin";
import webpack from "webpack";

class LangPlugin {
    public static readonly Name = "LangPlugin";

    private lang: string;

    constructor(lang: string) {
        this.lang = lang;
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(LangPlugin.Name, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
                LangPlugin.Name,
                (data) => {
                    data.html = data.html.replace(
                        "<html",
                        `<html lang="${this.lang}"`
                    );
                    return data;
                }
            );
        });
    }
}

const configure = (
    _: unknown,
    { mode }: { mode: "none" | "development" | "production" }
): webpack.Configuration => {
    const isProd = mode === "production";
    return {
        entry: path.join(__dirname, "src", "index.tsx"),
        output: {
            filename: isProd ? "[name].[chunkhash].js" : "[name].js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                compilerOptions: {
                                    module: "esnext",
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css?$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        { loader: "css-loader", options: { importLoaders: 1 } },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: [
                                    /* eslint-disable @typescript-eslint/no-var-requires */
                                    require("tailwindcss")({
                                        future: {
                                            removeDeprecatedGapUtilities: true,
                                        },
                                        purge: [
                                            path.join(
                                                __dirname,
                                                "src",
                                                "**",
                                                "*.tsx"
                                            ),
                                        ],
                                        theme: {
                                            extend: {
                                                boxShadow: {
                                                    outline:
                                                        "0 0 0 0.25rem rgba(102,126,234,0.5)",
                                                },
                                            },
                                        },
                                    }),
                                    require("autoprefixer"),
                                    /* eslint-enable @typescript-eslint/no-var-requires */
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Ethereal VTT",
                scriptLoading: "defer",
                meta: {
                    description: "Minimal peer to peer virtual table top",
                },
            }),
            new MiniCssExtractPlugin({
                filename: isProd ? "[name].[contenthash].css" : "[name].css",
            }),
            new LangPlugin("en"),
            new webpack.ContextReplacementPlugin(
                /\/peerjs\//,
                (data: { dependencies: { critical?: string }[] }) => {
                    delete data.dependencies[0].critical;
                    return data;
                }
            ),
        ],
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
            runtimeChunk: true,
            splitChunks: {
                chunks: "all",
            },
        },
    };
};

export default configure;
