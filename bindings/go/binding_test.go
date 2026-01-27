package tree_sitter_nari_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_nari "github.com/wearrrrr/tree-sitter-nari/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_nari.Language())
	if language == nil {
		t.Errorf("Error loading USL grammar")
	}
}
