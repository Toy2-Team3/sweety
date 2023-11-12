import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import { useRecoilState } from "recoil";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "../../constants/constant";
import { activeStepState } from "../../recoil/atoms";

function SignUpStepper() {
  const [activeStep] = useRecoilState(activeStepState);
  return (
    <Box sx={{ width: "340px", position: "absolute", top: "110px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
export default SignUpStepper;
