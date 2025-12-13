// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterKeszeg",
    products: [
        .library(name: "TreeSitterKeszeg", targets: ["TreeSitterKeszeg"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterKeszeg",
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
            name: "TreeSitterKeszegTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterKeszeg",
            ],
            path: "bindings/swift/TreeSitterKeszegTests"
        )
    ],
    cLanguageStandard: .c11
)
