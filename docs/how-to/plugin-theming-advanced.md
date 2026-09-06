# Plugin theming — advanced

Back to [plugin-theming.md](./plugin-theming.md).

## Workaround for older OpenSCD hosts

New plugins initialize from `--oscd-theme-*` with hex fallbacks. That already yields the Solarized defaults on hosts that do not set `--oscd-theme-*`, but uses the `--oscd-*` tokens set by host.

It does **not** pick up a brand that an older OpenSCD / CoMPAS host only published as unprefixed `--primary`, `--yellow`, … `--green`.
`prefers-color-scheme` / `light-dark()` also do not follow the in-app theme switch there.

Instead of only consume the "--oscd-theme-" token, you also consume the old "--oscd-" tokens as fallback before setting the default-value.
The expression `--my-internal-primary: var(--oscd-theme-primary, #2aa198);` changes to `--my-internal-primary: var(--oscd-theme-primary, var(--oscd-primary, #2aa198));`

> [!WARNING]
> The OSCD-ui library https://github.com/OMICRONEnergyOSS/oscd-ui currently uses the same `--oscd-` prefixed tokens as the old host-system.
> you can not set a css-token with it self like: `--oscd-primary: var(--oscd-primary, #001111);` => this would be a circle dependency.
>
> Solution: if you use the OSCD-ui library for Plugin developing for an old com-pas/open-scd, then you must wait until your client has update there server:
> You can still use the deprecated pattern by using the '--oscd-*' directly. New systems should still support them, but could be removed later.


```css
:host {
  /* Helper "--my-internal-*" tokens, so that fallbacks and defaults has only to be assigned once. */
  --my-internal-primary: var(--oscd-theme-primary, var(--oscd-primary, #2aa198));
  --my-internal-secondary: var(--oscd-theme-secondary, var(--oscd-secondary, #6c71c4));
  --my-internal-error: var(--oscd-theme-error, var(--oscd-error, #dc322f));
  --my-internal-warning: var(--oscd-theme-warning, var(--oscd-warning, #b58900));

  --my-internal-base03: var(--oscd-theme-base03, var(--oscd-base03, light-dark(#002b36, #fdf6e3)));
  --my-internal-base02: var(--oscd-theme-base02, var(--oscd-base02, light-dark(#073642, #eee8d5)));
  --my-internal-base01: var(--oscd-theme-base01, var(--oscd-base01, light-dark(#586e75, #93a1a1)));
  --my-internal-base00: var(--oscd-theme-base00, var(--oscd-base00, light-dark(#657b83, #839496)));
  --my-internal-base0: var(--oscd-theme-base0, var(--oscd-base0, light-dark(#839496, #657b83)));
  --my-internal-base1: var(--oscd-theme-base1, var(--oscd-base1, light-dark(#93a1a1, #586e75)));
  --my-internal-base2: var(--oscd-theme-base2, var(--oscd-base2, light-dark(#eee8d5, #073642)));
  --my-internal-base3: var(--oscd-theme-base3, var(--oscd-base3, light-dark(#fdf6e3, #002b36)));

  --my-internal-yellow: var(--oscd-theme-yellow, var(--oscd-yellow, #b58900));
  --my-internal-orange: var(--oscd-theme-orange, var(--oscd-orange, #cb4b16));
  --my-internal-red: var(--oscd-theme-red, var(--oscd-red, #dc322f));
  --my-internal-magenta: var(--oscd-theme-magenta, var(--oscd-magenta, #d33682));
  --my-internal-violet: var(--oscd-theme-violet, var(--oscd-violet, #6c71c4));
  --my-internal-blue: var(--oscd-theme-blue, var(--oscd-blue, #268bd2));
  --my-internal-cyan: var(--oscd-theme-cyan, var(--oscd-cyan, #2aa198));
  --my-internal-green: var(--oscd-theme-green, var(--oscd-green, #859900));

  --my-internal-text-font: var(--oscd-theme-text-font, var(--oscd-text-font, 'Roboto'));
  --my-internal-text-font-mono: var(--oscd-theme-text-font-mono, var(--oscd-text-font-mono, 'Roboto Mono'));
  /* NO var(--oscd-icon-font)! This was set to default 'Material Icons' on old systems which doesn't work at all. */
  --my-internal-icon-font: var(--oscd-theme-icon-font, 'Material Symbols Outlined');
  
  --my-internal-shape: var(--oscd-theme-shape, var(--oscd-shape, 8px));
  --my-internal-shape-none: 0;
  --my-internal-shape-extra-small: calc(0.5 * var(--my-internal-shape)); /* 4px */
  --my-internal-shape-small: var(--my-internal-shape); /* 8px */
  --my-internal-shape-medium: calc(1.5 * var(--my-internal-shape)); /* 12px */
  --my-internal-shape-large: calc(2 * var(--my-internal-shape)); /* 16px */
}
```

> [!WARNING]
> NO `--oscd-icon-font` for `--my-internal-icon-font`! This was set to default 'Material Icons' on old systems which doesn't work at all.

Do not set `--oscd-theme-*` in this block. That would hard-code the plugin over a later distro brand.

## Brand-specific fixes

If the host sets `--oscd-theme-branding` in `customer-branding.css`, you can ship brand CSS **with the plugin** before that host is upgraded:

```css
@container style(--oscd-theme-branding: MyCompany) {
  /* ... */
}
```

Temporary only. Remove the workaround once the host publishes the tokens.
