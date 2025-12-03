
import { useState } from "react";
import { Camera, Monitor, AlertTriangle, Eye, Lock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ProctorInstructions = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="pl-6 pr-6 pb-6 w-full">

        {/* Instructions Content */}
        <div className="">
          
          {/* Warning Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Important: This is a Monitored Assessment
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Your screen, camera, and activity will be monitored throughout this assessment to ensure academic integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <FileText size={24} className="text-blue-600" />
              Assessment Requirements
            </h2>
            
            <div className="space-y-4">
              {/* Camera Requirement */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Camera className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Camera Access Required</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your webcam must be enabled and visible throughout the entire assessment. Make sure you are in a well-lit area.
                  </p>
                </div>
              </div>

              {/* Screen Recording */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Monitor className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Screen Recording Required</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your entire screen will be recorded during the assessment. This includes all windows and applications.
                  </p>
                </div>
              </div>

              {/* Tab Monitoring */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Eye className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Single Tab Policy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You must keep this tab active and in focus at all times. Switching tabs or opening new windows will trigger warnings and may auto-submit your assessment.
                  </p>
                </div>
              </div>

              {/* Full Screen */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Lock className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Stay Focused</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Do not minimize this window or switch to other applications. Any suspicious activity will be flagged for review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rules Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Assessment Rules</h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Close all other tabs, applications, and programs before starting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ensure you are in a quiet, private location with minimal distractions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>No phones, notes, books, or external resources are permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>You must remain visible on camera for the entire duration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Leaving the assessment area or looking away frequently may result in flagging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Multiple violations will result in automatic submission of your assessment</span>
              </li>
            </ul>
          </div>

          {/* Consent */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I understand and agree to the proctoring requirements. I acknowledge that my screen, camera, and activity will be monitored throughout this assessment. I understand that violations of the assessment rules may result in disciplinary action.
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={() => { navigate('/student/catalog/dummy_path-id/learning/course-id-real/quiz/test-id-here'); }}
            disabled={!acceptedTerms}
            className={`w-fit px-4 py-4 rounded-md font-semibold text-lg transition-all ${
              acceptedTerms
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {acceptedTerms ? 'Accept & Start Proctored Assessment' : 'Please Accept Terms to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProctorInstructions;