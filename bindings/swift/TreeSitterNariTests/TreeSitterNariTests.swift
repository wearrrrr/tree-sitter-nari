import XCTest
import SwiftTreeSitter
import TreeSitterNari

final class TreeSitterNariTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_nari())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Nari grammar")
    }
}
