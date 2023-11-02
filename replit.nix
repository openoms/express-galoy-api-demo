{ pkgs }: {
    deps = [
		pkgs.nodePackages.prettier
      pkgs.qrencode.bin
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-18_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}