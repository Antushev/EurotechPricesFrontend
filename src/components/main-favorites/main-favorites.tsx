import React, {useEffect} from 'react';

interface Props {

}

const MainFavorites: React.FunctionComponent = (props: Props) => {

  useEffect(() => {
    document.title = 'Избранное';
  })

  return (
    <main className="page-content">
      <div className="page-content__wrapper container">
        <h1 className="header">Страница в разработке</h1>
      </div>
    </main>
  );
}

export default MainFavorites;
