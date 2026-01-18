# How to Publish sekerbura to NPM

## Prerequisites
1. **NPM Account**: You need an account on [npmjs.com](https://www.npmjs.com/).
2. **Login**: Run `npm login` in your terminal and follow the instructions.

## Publishing Steps

### 1. Update Version
Always update the version number in `package.json` before publishing a new release.
```bash
npm version patch # For bug fixes (1.0.0 -> 1.0.1)
npm version minor # For new features (1.0.0 -> 1.1.0)
npm version major # For breaking changes (1.0.0 -> 2.0.0)
```

### 2. Build the Project
Ensure the project is built and free of errors.
```bash
npm run build
```

### 3. Publish
Push the package to the public npm registry.
```bash
npm publish --access public
```

---

## Post-Publishing
Your package will be available at `https://www.npmjs.com/package/sekerbura`.
Users can now run:
```bash
npx sekerbura init
npx sekerbura add button
```
