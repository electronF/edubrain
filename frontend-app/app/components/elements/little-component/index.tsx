import React from 'react';
import { useEffect, useState } from 'react';


interface LittleComponentProps
{
    content:string
}

interface ProgressToolsProps {
    currentStep: number;
    maxStep: number;
    startTime: number;
}

interface DataFrameComponentProps {
    content: Map<string,  any>[];
}
  

export function TitleComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'blue',
          padding: '10px',
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    );
  }
  

  export function SubTitleComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'blue',
          padding: '10px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    );
  }
  


  export function SubTitleSuccessComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'green',
          padding: '10px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    );
  }
  

  export function SubTitleErrorComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'red',
          padding: '10px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    );
  }

  export function SimpleTitleComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          padding: '10px',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        {content}
      </div>
    );
  }
  

  export function StepMessageComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'rgb(240, 240, 240)',
          padding: '10px',
          borderRadius: '0.2rem',
          backgroundColor: 'rgb(28, 127, 208)',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        {content}
      </div>
    );
  }
  

  export function SuccessMessageComponent({ content }: LittleComponentProps) {
    return (
      <div
        style={{
          width: '100%',
          color: 'rgb(240, 240, 240)',
          padding: '10px',
          borderRadius: '0.2rem',
          backgroundColor: 'rgb(0, 171, 105)',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        {content}
      </div>
    );
  }
  

  export function OutputMessageComponent({ content }: LittleComponentProps) {
    const formattedContent = content
      .replace(/\n/g, '<br />')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  
    return (
      <div
        style={{
          width: '100%',
          color: 'rgb(40, 40, 40)',
          padding: '10px',
          borderRadius: '0.5rem',
          border: '2px solid gray',
          backgroundColor: 'rgb(200, 200, 200)',
          textAlign: 'center',
          fontSize: '16px',
        }}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    );
  }


export function ErrorMessageComponent({ content }: LittleComponentProps) {
  const formattedContent = content.replace(/\n/g, '<br />');

  return (
    <div
      style={{
        width: '100%',
        color: 'rgb(250, 250, 250)',
        padding: '10px',
        borderRadius: '0.5rem',
        border: '2px solid gray',
        backgroundColor: 'rgb(246, 56, 56)',
        textAlign: 'center',
        fontSize: '16px',
      }}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
}


export function ProgressToolsComponent({
  currentStep,
  maxStep,
  startTime,
}: ProgressToolsProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor(Date.now() / 1000 - startTime));
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'interval
  }, [startTime]);

  return (
    <div style={{ display: 'flex', padding: '10px' }}>
      <span style={{ marginLeft: 'auto', marginRight: '2rem' }}>
        <strong>Progression:</strong>{' '}
        <span style={{ color: 'blue' }}>
          {currentStep}/{maxStep}
        </span>
      </span>
      <span>
        <strong>Temps:</strong>{' '}
        <span style={{ color: 'blue' }}>{elapsedTime}s</span>
      </span>
    </div>
  );
}

export function WriteNothingComponent() {
    return <br />;
  }


export function DataFrameComponent({ content }: DataFrameComponentProps) {
  // Extraction des clés distinctes des objets
  const columns = Array.from(
    new Set(content.flatMap((item) => Object.keys(item)))
  );

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                border: '1px solid black',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                textAlign: 'left',
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col}
                style={{
                  border: '1px solid black',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                {item[col] !== undefined ? item[col].toString() : '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}