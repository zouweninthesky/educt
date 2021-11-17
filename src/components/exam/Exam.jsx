import React, { useState, useEffect, toJS } from "react";
import { Redirect } from "react-router";
import { observer } from "mobx-react-lite";
import "./Exam.scss";

import Panel from "../common/walkthrough/Panel/Panel";
import ProgressBar from "../common/walkthrough/ProgressBar/ProgressBar";
import ViewboxExam from "../common/Viewbox/ViewboxExam";
import CloseModal from "../common/Modal/common modals/CloseModal";
import FinishExamModal from "./modals/FinishExamModal";
import IntroExamModal from "./modals/IntroExamModal";
import TouchDetectedModal from "./modals/TouchDetectedModal";
import Overlay from "../common/Modal/Overlay";
import Loader from "../common/Loader/Loader";

import Store from "../../store";
import ExamStore from "../../store/exam";
import { useModal } from "../common/Modal/ModalContext";
import {
  MODAL_INTRO_EXAM_ID,
  MODAL_FINISH_EXAM_ID,
  MODAL_TOUCH_DETECTED_ID,
} from "../../utils/constants/modals";

const Exam = observer(({ scriptUID }) => {
  const [, setModalID] = useModal();
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => {
    (async () => {
      await ExamStore.getScript(scriptUID);
      setModalID(MODAL_INTRO_EXAM_ID);

      if (ExamStore.script.steps.length === 1) {
        setIsLastStep(true);
      }
    })();
  }, [scriptUID]);

  if (ExamStore.wasTouched) {
    setModalID(MODAL_TOUCH_DETECTED_ID);

    return (
      <main className="exam">
        <TouchDetectedModal />
        <Overlay />
      </main>
    );
  }

  if (Store.loading) return <Loader />;

  const nextStep = () => {
    const stepsNumber = ExamStore.script.steps.length;
    const block = ExamStore.currentStepID === stepsNumber - 2;
    ExamStore.startImageLoad();
    if (block) {
      ExamStore.stepFinished();
      setIsLastStep(true);
    } else {
      ExamStore.stepFinished();
    }
  };

  const lastStepClick = async () => {
    await ExamStore.finishExam();
    setModalID(MODAL_FINISH_EXAM_ID);
  };

  const actionClick = isLastStep ? lastStepClick : nextStep;

  const currentStep = ExamStore.script.steps[ExamStore.currentStepID];

  return (
    <main className="exam">
      <ViewboxExam step={currentStep} actionClick={actionClick} />
      <Panel step={currentStep} isExam={true} />
      <ProgressBar
        current={ExamStore.currentStepID}
        total={ExamStore.script.steps.length}
      />
      <CloseModal isExam={true} />
      <IntroExamModal script={ExamStore.script} />
      <FinishExamModal />
      <Overlay />
    </main>
  );
});

export default Exam;
