import { Report } from 'interface/report.interface';
import { FieldController } from 'components/FieldControler';

export function ReportBody({ report, isPrint }: { report: Report, isPrint: boolean }) {
  return (
    <>
      {report.body.fields && report.body.fields.map((field: any, index) => (
        <FieldController key={index} label={field.name}  name={field.name} initialValue={field.value} type={field.type} isPrint={isPrint}/>
      ))}
      {report.body.images && report.body.images.map((image, index) => (
        <div key={index}>
          <img
            src={image.url}
            alt={image.altText}
          />
          <div>{image.caption}</div>
        </div>
      ))}
    </>
  );
}

