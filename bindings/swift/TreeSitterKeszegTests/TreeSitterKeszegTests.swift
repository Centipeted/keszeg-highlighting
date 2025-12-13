import XCTest
import SwiftTreeSitter
import TreeSitterKeszeg

final class TreeSitterKeszegTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_keszeg())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Keszeg grammar")
    }
}
