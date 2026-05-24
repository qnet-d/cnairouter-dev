FROM oven/bun:1-alpine AS default-web
WORKDIR /src/web/default

COPY VERSION /src/VERSION
COPY web/default/package.json web/default/bun.lock ./
RUN bun install --frozen-lockfile

COPY web/default ./
ARG VITE_REACT_APP_VERSION
RUN VITE_REACT_APP_VERSION="${VITE_REACT_APP_VERSION:-$(cat /src/VERSION)}" bun run build

FROM oven/bun:1-alpine AS classic-web
WORKDIR /src/web/classic

COPY VERSION /src/VERSION
COPY web/classic/package.json web/classic/bun.lock ./
RUN bun install --frozen-lockfile

COPY web/classic ./
ARG VITE_REACT_APP_VERSION
RUN VITE_REACT_APP_VERSION="${VITE_REACT_APP_VERSION:-$(cat /src/VERSION)}" bun run build

FROM golang:1.26.1-alpine AS builder
ENV GO111MODULE=on CGO_ENABLED=0 GOPROXY=https://goproxy.cn,direct

ARG TARGETOS
ARG TARGETARCH
ENV GOOS=${TARGETOS:-linux} GOARCH=${TARGETARCH:-amd64}
ENV GOEXPERIMENT=greenteagc

WORKDIR /build

ADD go.mod go.sum ./
RUN go mod download

COPY . .
RUN rm -rf web/default/dist web/classic/dist
COPY --from=default-web /src/web/default/dist ./web/default/dist
COPY --from=classic-web /src/web/classic/dist ./web/classic/dist
RUN go build -ldflags "-s -w -X 'github.com/QuantumNous/new-api/common.Version=$(cat VERSION)'" -o new-api

FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates tzdata wget \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates

COPY --from=builder /build/new-api /
COPY LICENSE NOTICE THIRD-PARTY-LICENSES.md /licenses/
EXPOSE 3000
WORKDIR /data
ENTRYPOINT ["/new-api"]
