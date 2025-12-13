package tree_sitter_keszeg_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_keszeg "github.com/tree-sitter/tree-sitter-keszeg/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_keszeg.Language())
	if language == nil {
		t.Errorf("Error loading Keszeg grammar")
	}
}
