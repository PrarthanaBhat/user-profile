import { useState } from "react";
import "../styles/ProfileSetup.css";
import "../styles/ReviewSubmit.css";

const ReviewSubmit = ({ formData, onBack, onSubmit }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [agree, setAgree] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setResumeFile(file);
      setUploadedFile(file);
    } else {
      alert("File must be under 2MB.");
    }
  };

  if (!formData) {
    return (
      <div className="profile-setup-container">
        No data found. Please go back and fill out the form.
      </div>
    );
  }

  const handleSubmit = () => {
    if (!agree) {
      alert("Please confirm that you've checked the above data.");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume before submitting.");
      return;
    }
    const finalData = {
      ...formData,
      resume: resumeFile,
    };

    console.log("Submitted Data:", finalData);
    onSubmit(finalData);
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-header">
        <h2>Review & submit</h2>
        <p>Almost done! Double-check your info.</p>
      </div>

      <div className="review-box">
        <section>
          <h3>Basic information</h3>
          <div className="review-grid">
            <div className="review-field">
              <div className="field-value">{formData.fullName}</div>
              <div className="field-label">Full Name</div>
            </div>
            <div className="review-field">
              <div className="field-value">{formData.email}</div>
              <div className="field-label">Email</div>
            </div>
            <div className="review-field">
              <div className="field-value">{formData.phone}</div>
              <div className="field-label">Phone Number</div>
            </div>
            <div className="review-field">
              <div className="field-value">{formData.location}</div>
              <div className="field-label">Location</div>
            </div>
            <div className="review-field">
              <div className="field-value">{formData.linkedin || "-"}</div>
              <div className="field-label">LinkedIn</div>
            </div>
          </div>
        </section>
{formData.expYears && (
          <section>
            <h3>Work Experience</h3>
            <div className="review-grid">
              <div className="review-field">
                <div className="field-value">
                  {formData.expYears} years {formData.expMonths} months
                </div>
                <div className="field-label">Total Experience</div>
              </div>
              <div className="review-field">
                <div className="field-value">{formData.company}</div>
                <div className="field-label">Company</div>
              </div>
              <div className="review-field">
                <div className="field-value">{formData.designation}</div>
                <div className="field-label">Job Title</div>
              </div>
              <div className="review-field">
                <div className="field-value">
                  {formData.joinMonth} {formData.joinYear}
                </div>
                <div className="field-label">Joining Date</div>
              </div>
              <div className="review-field">
                <div className="field-value">{formData.notice}</div>
                <div className="field-label">Notice Period</div>
              </div>
              <div className="review-field full-width">
                <div className="field-value">{formData.jobProfile || "-"}</div>
                <div className="field-label">Job Profile</div>
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {formData.education && formData.education.length > 0 && (
          <section>
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="review-grid">
                <div className="review-field">
                  <div className="field-value">{edu.degree}</div>
                  <div className="field-label">Degree</div>
                </div>
                <div className="review-field">
                  <div className="field-value">{edu.institute}</div>
                  <div className="field-label">Institute</div>
                </div>
                <div className="review-field">
                  <div className="field-value">{edu.location}</div>
                  <div className="field-label">Location</div>
                </div>
                <div className="review-field">
                  <div className="field-value">{edu.startYear} - {edu.endYear}</div>
                  <div className="field-label">Duration</div>
                </div>
              </div>
            ))}
          </section>
        )}
        <div className="resume-upload-section">
          <label className="resume-label">
            Resume upload<span className="required">*</span>
          </label>

          <div className="upload-area">
            <div className="upload-box">
              <label htmlFor="resume-input" className="upload-btn">
                <span className="upload-icon">📄</span> Upload resume
              </label>
              <input
                id="resume-input"
                type="file"
                accept=".pdf,.doc,.docx,.rtf"
                onChange={handleResumeUpload}
                style={{ display: "none" }}
              />
              <p className="format-hint">
                Supported Formats: doc, docx, rtf, pdf, upto 2 MB
              </p>
            </div>

            {uploadedFile && (
              <div className="resume-preview">
                <div className="pdf-icon">📄</div>
                <div className="resume-info">
                  <p className="file-name">{uploadedFile.name}</p>
                  <p className="file-size">
                    {(uploadedFile.size / 1024).toFixed(1)}kb
                  </p>
                </div>
                <button
                  type="button"
                  className="delete-file"
                  onClick={() => setUploadedFile(null)}
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="checkbox-section">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        <label htmlFor="agree">Yes, I’ve checked the above data</label>
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
        <button
          className="next-btn"
          disabled={!agree || !resumeFile}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
