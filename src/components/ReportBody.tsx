import { Report } from 'interface/report.interface';

export function ReportBody({ report }: { report: Report }) {
  return (
    <>
      {report.body.fields && report.body.fields.map((field: any, index) => (
        <div key={index}>
          <strong>{field.name}:</strong> {field.value}
        </div>
      ))}
      {report.body.images && report.body.images.map((image, index) => (
        <div key={index}>
          <img
            src={image.url}
            alt={image.altText}
            style={{ float: image.layout.toLowerCase() as any, margin: '10px' }}
          />
          <div>{image.caption}</div>
        </div>
      ))}
    </>
  );
}

