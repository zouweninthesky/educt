import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Scripts from "../../../../store";

import "./Info.scss";

const Info = observer((props) => {
  const { chosenScript } = Scripts;

  if (chosenScript === null) {
    return <></>;
  }

  return (
    <section className="hub-info">
      <h2 className="visually-hidden">Информация о сценарии</h2>
      <div className="hub-info__wrapper">
        <div className="hub-info__preview-wrapper">
          {/* <img src="" alt="Первый кадр сценария" /> */}
        </div>
        <div className="hub-info__content-wrapper">
          <h3 className="hub-info__title">{chosenScript.title}</h3>
          <dl className="hub-info__quality-list">
            <dt className="hub-info__quality-name">Описание</dt>
            <dd className="hub-info__description">
              {chosenScript.description}
            </dd>
            <dt className="hub-info__quality-name">Теги</dt>
            <dd className="hub-info__tags">
              {chosenScript.tags.length !== 0
                ? chosenScript.tags.join(", ")
                : "Пока нет тегов"}
            </dd>
            <dt className="hub-info__quality-name">Дата создания</dt>
            <dd className="hub-info__origin-date">{chosenScript.date}</dd>
          </dl>
          <div className="hub-info__button-wrapper">
            <div className="hub-info__small-button-wrapper">
              <Link
                to="/player/:id/test"
                className="hub-info__button hub-info__button--outline button"
              >
                Тестирование
              </Link>
              <button
                type="button"
                className="hub-info__stats hub-info__button hub-info__button--outline button"
              >
                <svg width="22" height="22">
                  <use xlinkHref="#graph-bar" />
                </svg>
                <span className="visually-hidden">Статистика</span>
              </button>
            </div>
            <Link to="/player/:id/show" className="hub-info__button button">
              Пройти сценарий
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

// class Info extends Component {
//   render() {
//     const { chosenScript } = this.props;
//     if (chosenScript === null) {
//       return <></>;
//     }

//     return (
//       <section className="hub-info">
//         <h2 className="visually-hidden">Информация о сценарии</h2>
//         <div className="hub-info__wrapper">
//           <div className="hub-info__preview-wrapper">
//             {/* <img src="" alt="Первый кадр сценария" /> */}
//           </div>
//           <div className="hub-info__content-wrapper">
//             <h3 className="hub-info__title">{chosenScript.title}</h3>
//             <dl className="hub-info__quality-list">
//               <dt className="hub-info__quality-name">Описание</dt>
//               <dd className="hub-info__description">
//                 {chosenScript.description}
//               </dd>
//               <dt className="hub-info__quality-name">Теги</dt>
//               <dd className="hub-info__tags">
//                 {chosenScript.tags.length !== 0
//                   ? chosenScript.tags.join(", ")
//                   : "Пока нет тегов"}
//               </dd>
//               <dt className="hub-info__quality-name">Дата создания</dt>
//               <dd className="hub-info__origin-date">{chosenScript.date}</dd>
//             </dl>
//             <div className="hub-info__button-wrapper">
//               <div className="hub-info__small-button-wrapper">
//                 <Link
//                   to="/player/:id/test"
//                   className="hub-info__button hub-info__button--outline button"
//                 >
//                   Тестирование
//                 </Link>
//                 <button
//                   type="button"
//                   className="hub-info__stats hub-info__button hub-info__button--outline button"
//                 >
//                   <svg width="22" height="22">
//                     <use xlinkHref="#graph-bar" />
//                   </svg>
//                   <span className="visually-hidden">Статистика</span>
//                 </button>
//               </div>
//               <Link to="/player/:id/show" className="hub-info__button button">
//                 Пройти сценарий
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default Info;
