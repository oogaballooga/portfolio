'use client';

import { useCallback, useEffect } from 'react';
import { mastersEducation, bachelorsEducation, courses } from '../../data/education';
import DegreeCard from '../DegreeCard';
import CourseCard from '../CourseCard';
import { formatDateRange } from '../../lib/formatting';
import { useCourseCardStack } from '../../hooks/useCourseCardStack';
import { useCameraContext } from '../CameraContext';
import '../CourseCard.css';

export default function AcademicsSection() {
  const { getCardProps, deactivateAll } = useCourseCardStack();
  const { currentPage } = useCameraContext();

  // Deactivate all course cards when user navigates away from academics
  useEffect(() => {
    if (currentPage !== 'academics') {
      deactivateAll();
    }
  }, [currentPage, deactivateAll]);


  const handleBackgroundClick = useCallback(() => {
    deactivateAll();
  }, [deactivateAll]);

  return (
    <div
      className="relative w-full min-h-screen text-white"
      onClick={handleBackgroundClick}
    >
      <div className="max-w-[90rem] mx-auto px-8 pt-24 pb-16">
        <h2 className="text-2xl font-bold mb-8">Degrees</h2>

        {/* Degree Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,670px))] justify-center gap-8 mb-20">
          <DegreeCard
            degree={mastersEducation.degree}
            school={mastersEducation.school}
            dates={formatDateRange(mastersEducation.startDate, mastersEducation.endDate)}
            gpa={mastersEducation.gpa}
            honors={mastersEducation.honors}
            logo={mastersEducation.logo}
          />
          <DegreeCard
            degree={bachelorsEducation.degree}
            school={bachelorsEducation.school}
            dates={formatDateRange(
              bachelorsEducation.startDate,
              bachelorsEducation.endDate
            )}
            gpa={bachelorsEducation.gpa}
            honors={bachelorsEducation.honors}
            logo={bachelorsEducation.logo}
          />
        </div>

        {/* Relevant Courses */}
        <h2 className="text-2xl font-bold mb-8">Relevant Courses</h2>
        <div className="course-grid">
          {courses.map((course) => {
            const { isActive, zIndex, onActivate } = getCardProps(course.id);
            return (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                isActive={isActive}
                zIndex={zIndex}
                onActivate={onActivate}
                onDeactivate={deactivateAll}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}