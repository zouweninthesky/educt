import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Dropdown from "../Dropdown/Dropdown";
import Info from "./Info/Info";
import ScriptItem from "./ScriptItem/ScriptItem";
import Spinner from "../../common/Spinner/Spinner";
import ErrorIndicator from "../../common/ErrorIndicator/ErrorIndicator";

import Scripts from "../../../store";

import "./Hub.scss";

const Hub = observer(() => {
  useEffect(() => {
    Scripts.scriptsLoad();
  }, []);

  if (Scripts.loading) {
    return <Spinner />;
  }

  if (Scripts.error) {
    return <ErrorIndicator />;
  }

  return (
    <main className="hub container">
      <section className="hub__content">
        <h2 className="visually-hidden">Список сценариев</h2>
        <Dropdown />
        <div className="hub__content-wrapper">
          <ul className="hub__script-list">
            {Scripts.scripts.map((script, i) => {
              return <ScriptItem key={i} id={script.id} title={script.title} />;
            })}
          </ul>
        </div>
      </section>
      <Info />
    </main>
  );
});

export default Hub;

// class Hub extends Component {
//   componentDidMount() {
//     const { fetchScripts } = this.props;
//     fetchScripts();
//   }

//   render() {
//     const { scripts, loading, error } = this.props;

//     if (loading) {
//       // return <Spinner />
//     }

//     if (error) {
//       return <ErrorIndicator />;
//     }

//     return (
//       <main className="hub container">
//         <section className="hub__content">
//           <h2 className="visually-hidden">Список сценариев</h2>
//           <Dropdown />
//           <div className="hub__content-wrapper">
//             <ul className="hub__script-list">
//               {scripts.map((script, i) => {
//                 return (
//                   <ScriptItem
//                     key={i}
//                     id={script.id}
//                     title={script.title}
//                     onClick={this.props.onClick}
//                   />
//                 );
//               })}
//             </ul>
//           </div>
//         </section>
//         <Info />
//       </main>
//     );
//   }
// }

// const mapStateToProps = ({ scripts, loading, error }) => {
//   return { scripts, loading, error };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const { userScriptsService } = ownProps;
//   return {
//     fetchScripts: () => {
//       dispatch(scriptsRequested());
//       userScriptsService
//         .getUserScripts()
//         .then((data) => dispatch(scriptsLoaded(data)))
//         .catch((err) => dispatch(scriptsError(err)));
//     },
//     onClick: (id) => {
//       dispatch(scriptChosen(id));
//     },
//   };
// };

// export default compose(
//   withUserScriptsService(),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Hub);
