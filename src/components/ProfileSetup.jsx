import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "./ProgressBar";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import ReviewSubmit from "./ReviewSubmit";
import ProfileSuccess from "./ProfileSuccess";
import codes from "country-calling-code";
import { Info } from "lucide-react";
import "../styles/ProfileSetup.css";
import "../styles/ProgressBar.css";

import { useDispatch, useSelector } from "react-redux";
import {
  updateBasicInfo,
  nextStep,
  prevStep,
  setSubmitted,
} from "../slices/profileSlice";

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.profile.step);
  const isSubmitted = useSelector((state) => state.profile.isSubmitted);
  const basicInfo = useSelector((state) => state.profile.basicInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: basicInfo,
  });

  useEffect(() => {
    Object.entries(basicInfo).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [basicInfo, setValue]);

  const [selectedCode, setSelectedCode] = useState("+91");
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const [combinedFormData, setCombinedFormData] = useState({});

  const steps = [
    "Basic Info",
    "Work Experience",
    "Education",
    "Review & Submit",
  ];

  const countryCodes = useMemo(() => {
    return codes
      .map((c) => ({
        name: c.country,
        code: "+" + c.countryCodes[0],
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  useEffect(() => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: "India",
      })
      .then((res) => setStates(res.data.data.states))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: "India",
          state: selectedState,
        })
        .then((res) => setCities(res.data.data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

  const onSubmit = (data) => {
    const fullPhone = `${selectedCode}${data.phone}`;
    const completeForm = { ...data, phone: fullPhone };

    setCombinedFormData((prev) => ({
      ...prev,
      ...completeForm,
    }));

    dispatch(updateBasicInfo(completeForm));
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep()); //->  Go back a step using Redux with preStep
  };

  const handleFinalSubmit = (finalData) => {
    console.log("Final submitted data:", finalData);
    dispatch(setSubmitted()); // Form submitted, setting up the flag for isSubmitted and check for submit, once submitted show the success page!
  };

  return (
    <>
      {isSubmitted ? (
        <ProfileSuccess fullName={basicInfo.fullName} email={basicInfo.email} />
      ) : (
        <>
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            isSubmitted={isSubmitted}
          />

          {currentStep === 0 && (
            <div className="profile-setup-container">
              <div className="profile-header">
                <h2 className="profile-title">Basic Information</h2>
                <p>Let's start with the essentials.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
                {/* Row 1 */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Full name<span className="required">*</span>
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      placeholder="Enter full name"
                    />
                    {errors.fullName && (
                      <span className="error">{errors.fullName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Email address<span className="required">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="error">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Phone number<span className="required">*</span>
                    </label>
                    <div className="phone-wrapper">
                      <select
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                      >
                        {countryCodes.map((c, i) => (
                          <option key={i} value={c.code}>
                            {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter 10 digit phone number",
                          },
                        })}
                        placeholder="0000000000"
                      />
                    </div>
                    {errors.phone && (
                      <span className="error">{errors.phone.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Date of birth<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Date of birth is required",
                      })}
                    />
                    {errors.dob && (
                      <span className="error">{errors.dob.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      State<span className="required">*</span>
                    </label>
                    <select
                      {...register("state", { required: "State is required" })}
                      onChange={(e) => setSelectedState(e.target.value)}
                      defaultValue=""
                    >
                      <option value="">Select</option>
                      {states.map((state, i) => (
                        <option key={i} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="error">{errors.state.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="with-icon">
                      City<span className="required">*</span>
                      {!selectedState && (
                        <span
                          className="info-icon"
                          onClick={() => setShowCityInfo((prev) => !prev)}
                        >
                          <Info size={16} color="#555" />
                        </span>
                      )}
                    </label>

                    <select
                      {...register("city", { required: "City is required" })}
                      disabled={!selectedState}
                      defaultValue=""
                    >
                      <option value="">
                        {selectedState ? "Select city" : "Select state first"}
                      </option>
                      {selectedState &&
                        cities.map((city, i) => (
                          <option key={i} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>

                    {showCityInfo && (
                      <div className="info-tooltip">
                        Please select a state first to choose a city.
                      </div>
                    )}
                    {errors.city && selectedState && (
                      <span className="error">{errors.city.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>LinkedIn Profile</label>
                  <input
                    {...register("linkedin")}
                    placeholder="linkedin.com/in/yourname"
                  />
                </div>

                <div className="form-actions full-width">
                  <button
                    type="submit"
                    className="next-btn"
                    
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}
          {currentStep === 1 && (
            <WorkExperience
              onNext={(data) => {
                setCombinedFormData((prev) => ({ ...prev, ...data }));
                dispatch(nextStep());
              }}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <Education
              onNext={(data) => {
                setCombinedFormData((prev) => ({
                  ...prev,
                  education: data.education,
                }));
                dispatch(nextStep());
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <ReviewSubmit
              formData={combinedFormData}
              onBack={handleBack}
              onSubmit={handleFinalSubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProfileSetup;
