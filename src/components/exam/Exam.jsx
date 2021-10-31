import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { observer } from "mobx-react-lite";
import "./Exam.scss";

import Panel from "../common/Walkthrough/Panel/Panel";
import ProgressBar from "../common/Walkthrough/ProgressBar/ProgressBar";
import ViewboxExam from "../common/Viewbox/ViewboxExam";
import Overlay from "../common/Modal/Overlay";
import CloseModal from "../common/Modal/common modals/CloseModal";
// import FinishPlayModal from "./modals/FinishPlayModal";
import IntroExamModal from "./modals/IntroExamModal";

import ExamStore from "../../store/exam";
import { useModal } from "../common/Modal/ModalContext";
import {
  MODAL_INTRO_EXAM_ID,
  MODAL_FINISH_EXAM_ID,
} from "../../utils/constants/modals";

const Exam = observer(() => {
  const [, setModalID] = useModal();
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => {
    if (ExamStore.script) {
      setModalID(MODAL_INTRO_EXAM_ID);

      if (ExamStore.script.steps.length === 1) {
        setIsLastStep(true);
      }
    }
  }, []);

  if (ExamStore.script === undefined) {
    return <Redirect to="/user" />;
  }

  const nextStep = () => {
    const stepsNumber = ExamStore.script.steps.length;
    const block = ExamStore.currentStepId === stepsNumber - 2;
    ExamStore.startImageLoad();
    if (block) {
      ExamStore.stepFinished();
      setIsLastStep(true);
    } else {
      ExamStore.stepFinished();
    }
  };

  const lastStepClick = () => {
    setModalID.bind(null, MODAL_FINISH_EXAM_ID);
    ExamStore.finishExam();
  };

  const actionClick = isLastStep ? lastStepClick : nextStep;

  const currentStep = ExamStore.script.steps[ExamStore.currentStepID];

  return (
    <main className="exam">
      <ViewboxExam step={currentStep} actionClick={actionClick} />
      <Panel step={currentStep} isExam={true} />
      <ProgressBar
        current={ExamStore.currentStepId}
        total={ExamStore.script.steps.length}
      />
      <CloseModal isExam={true} />
      <IntroExamModal script={ExamStore.script} />
      {/* <FinishPlayModal /> */}
      <Overlay />
    </main>
  );
});

export default Exam;
