package tree_sitter_usl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_usl "github.com/wearrrrr/tree-sitter-usl/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_usl.Language())
	if language == nil {
		t.Errorf("Error loading USL grammar")
	}
}
