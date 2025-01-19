# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# @swesley400/report-lib

A React library for creating and managing PDF reports with customizable templates and interactive previews.

## Installation

```bash
npm install @swesley400/report-lib
```

## Features

- PDF document generation with customizable templates
- Interactive template preview with editable fields
- Support for dynamic field values and updates
- Base64 PDF output for flexible handling

## Components

### PDFDocumentBuilder

A component for building and generating PDF documents from templates.

```tsx
import { PDFDocumentBuilder } from '@swesley400/report-lib';

function MyComponent() {
  const handleSave = (base64PDF: string) => {
    // Handle the generated PDF
  };

  return (
    <PDFDocumentBuilder
      report={reportTemplate}
      isPrint={false}
      fieldValues={values}
      updateFieldValue={handleFieldUpdate}
      onSave={handleSave}
    />
  );
}
```

### TemplatePreview

A component for previewing and editing report templates.

```tsx
import { TemplatePreview } from '@swesley400/report-lib';

function MyPreview() {
  return (
    <TemplatePreview
      template={template}
      fields={fields}
      onFieldChange={handleFieldChange}
    />
  );
}
```

## API Reference

### PDFDocumentBuilder Props

| Prop | Type | Description |
|------|------|-------------|
| report | ReportTemplate | The template configuration for the PDF |
| isPrint | boolean | Whether the document is in print mode |
| fieldValues | Record<string, any> | Values for template fields |
| updateFieldValue | (field: string, value: any) => void | Callback for field updates |
| onSave | (base64PDF: string) => void | Callback when PDF is generated |

### TemplatePreview Props

| Prop | Type | Description |
|------|------|-------------|
| template | Template | The template configuration |
| fields | Field[] | Array of editable fields |
| onFieldChange | (field: Field) => void | Callback for field changes |

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test
```

## License

MIT © [swesley400]
