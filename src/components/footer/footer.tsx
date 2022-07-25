import * as React from 'react';

interface Props {

}

const Footer: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <footer className="page-footer">
      <div className="page-footer__wrapper container">
        <p className="page-footer__contacts">
          По всем вопросам: +7 (931) 405-04-66
        </p>
      </div>
    </footer>
  );
}

export default Footer;
