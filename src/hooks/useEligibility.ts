import { useState, useEffect } from 'react';
import type { EligibilityStatus } from '@/lib/types';

interface EligibilityResponse {
  status: EligibilityStatus;
  academicDegree: string | null;
  isLoading: boolean;
}

const useEligibility = (): EligibilityResponse => {
  const [status, setStatus] = useState<EligibilityStatus>('loading');
  const [academicDegree, setAcademicDegree] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch('/api/student/certified-notes/status');
        // const data = await response.json();

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock response - in a real app, this would come from your API
        const mockResponse = {
          isRequestPeriod: true, // Check if it's currently the request period
          hasGraduated: true, // Check if student has graduated with a degree
          hasRequested: false, // Check if student already requested
          academicDegree: 'Ingeniería en Informática' // Student's academic degree
        };

        if (!mockResponse.isRequestPeriod) {
          setStatus('period-closed');
        } else if (mockResponse.hasRequested) {
          setStatus('already-requested');
        } else if (mockResponse.hasGraduated) {
          setStatus('eligible');
          setAcademicDegree(mockResponse.academicDegree);
        } else {
          setStatus('not-eligible');
        }
      } catch (error) {
        console.error('Error checking certified notes status:', error);
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    checkEligibility();
  }, []);

  return {
    status,
    academicDegree,
    isLoading
  };
};

export default useEligibility;
