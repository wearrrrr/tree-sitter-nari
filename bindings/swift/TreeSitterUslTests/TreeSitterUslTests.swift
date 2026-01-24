import XCTest
import SwiftTreeSitter
import TreeSitterUsl

final class TreeSitterUslTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_usl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading USL grammar")
    }
}
