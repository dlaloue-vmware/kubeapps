# Copyright 2021-2022 the Kubeapps contributors.
# SPDX-License-Identifier: Apache-2.0

PROTO_VENDOR = .vendor

# Build the helm and kapp package plugins with the output in the devel directory.
build-plugins:
	go build -o devel/kapp-controller-packages-v1alpha1-plugin.so -buildmode=plugin plugins/kapp_controller/packages/v1alpha1/*.go
	go build -o devel/fluxv2-packages-v1alpha1-plugin.so -buildmode=plugin plugins/fluxv2/packages/v1alpha1/*.go
	go build -o devel/helm-packages-v1alpha1-plugin.so -buildmode=plugin plugins/helm/packages/v1alpha1/*.go


# Ensure the required version of cli tooling in tools/tools.go is installed.
# The versions are stored in ../go.mod as usual and this same approach is used in
# both octant and pinniped for build tooling.
# See https://github.com/golang/go/wiki/Modules#how-can-i-track-tool-dependencies-for-a-module
cli-dependencies:
	go install github.com/spf13/cobra-cli
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1.0
	go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.25.0
	go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@v2.3.0
	go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@v2.3.0

# Not sure if it's worth having targets for buf, but at least the targets can
# be tooling agnostic.
generate: cli-dependencies
	rm -rf $(PROTO_VENDOR)

	go list -f "$(PROTO_VENDOR)/{{ .Path }}" -m all  |  xargs -L1 dirname | sort | uniq | xargs mkdir -p
	go list -f "{{ .Dir }} $(PROTO_VENDOR)/{{ .Path }}" -m all  |  grep -v ^" $(PROTO_VENDOR)" | xargs -L1 -- ln -s

	buf generate --path=./proto/kubeappsapis

# runs the server locally
run: build-plugins
	go run main.go --plugin-dir devel/ --unsafe-local-dev-kubeconfig=true

# execute all tests
test:
	go test ./...

.PHONY: build-plugins cli-dependencies generate run test
