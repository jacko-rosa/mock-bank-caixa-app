import "swagger-ui-react/swagger-ui.css";

interface ContractInformationProps {
  title: string;
  description: string;
  versionApi?: string;
  openapi?: string;
  contract: string;
}

export default function ContractInformation({ title, description, versionApi, openapi, contract }: ContractInformationProps) {
  versionApi = versionApi ? versionApi : '1.0.0';
  openapi = openapi ? openapi : '3.0.0';
  return (
    <div className="swagger-ui">
      <div>
        <div className="information-container wrapper contract">
          <section className="block col-12">
            <div>
              <div className="info">
                <hgroup className="main">
                  <h2 className="title">
                    {title}
                    <span>
                      <small>
                        <pre className="version"> {versionApi} </pre>
                      </small>
                      <small className="version-stamp">
                        <pre className="version">{`OAS ${openapi}`}</pre>
                      </small>
                    </span>
                  </h2>
                  <a target="_blank" href={`contract/${contract}.yaml`} rel="noopener noreferrer" className="link">
                    <span className="url"> {`contract/${contract}.yaml`}</span>
                  </a>
                </hgroup>
                <div className="description">
                  <div className="renderedMarkdown">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}