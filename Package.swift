// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterUsl",
    products: [
        .library(name: "TreeSitterUsl", targets: ["TreeSitterUsl"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterUsl",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterUslTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterUsl",
            ],
            path: "bindings/swift/TreeSitterUslTests"
        )
    ],
    cLanguageStandard: .c11
)
