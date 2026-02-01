#!/bin/bash

set -e

echo "=== Setting up Tree-sitter for Nari ==="

# Check if tree-sitter-cli is installed
if ! command -v tree-sitter &> /dev/null; then
    echo "Error: tree-sitter CLI not found"
    echo "Install it with: npm install -g tree-sitter-cli"
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Generating parser..."
tree-sitter generate

echo "Testing grammar..."
echo "Testing with test_features.nari..."
tree-sitter parse ../tests/expect_pass/test_features.nari || true

echo ""
echo "=== Tree-sitter setup complete! ==="
echo ""
