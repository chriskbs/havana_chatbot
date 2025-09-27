-- 1. Seed categories (already done)
INSERT INTO categories (name) VALUES
('Scholarships'),
('Admissions'),
('Courses'),
('Campus Life'),
('Housing & Accommodation'),
('Fees & Payment'),
('Exams & Grading'),
('Career Services');

-- 2. Seed subcategories (already done)
INSERT INTO subcategories (category_id, name) VALUES
-- Scholarships
(1, 'Merit-based Scholarships'),
(1, 'Need-based Scholarships'),
(1, 'International Scholarships'),
(1, 'Special Awards'),
-- Admissions
(2, 'Undergraduate Admissions'),
(2, 'Postgraduate Admissions'),
(2, 'Transfer Students'),
(2, 'International Students'),
-- Courses
(3, 'Medicine'),
(3, 'Engineering'),
(3, 'Arts & Humanities'),
(3, 'Business & Economics'),
(3, 'Computer Science'),
(3, 'Law'),
(3, 'Education'),
(3, 'Social Sciences'),
-- Campus Life
(4, 'Clubs & Societies'),
(4, 'Sports & Recreation'),
(4, 'Events & Festivals'),
(4, 'Health & Wellness'),
(4, 'Student Support Services'),
-- Housing & Accommodation
(5, 'On-campus Housing'),
(5, 'Off-campus Housing'),
(5, 'International Students Housing'),
(5, 'Housing Policies'),
-- Fees & Payment
(6, 'Tuition Fees'),
(6, 'Payment Methods'),
(6, 'Financial Aid'),
(6, 'Refunds & Withdrawals'),
-- Exams & Grading
(7, 'Exam Schedules'),
(7, 'Grading System'),
(7, 'Re-taking Exams'),
(7, 'Exam Policies'),
-- Career Services
(8, 'Internships'),
(8, 'Job Placements'),
(8, 'Career Counseling'),
(8, 'Workshops & Networking');

-- 3. Seed FAQ items (heavily expanded)

INSERT INTO faq_items (subcategory_id, question, answer) VALUES
-- Merit-based Scholarships
(1, 'How do I apply for merit-based scholarships?', 'Submit your academic transcripts and application form before the deadline.'),
(1, 'What GPA is needed?', 'Usually a GPA of 3.5 or above.'),
(1, 'Can I apply for multiple scholarships?', 'Yes, if eligible.'),
(1, 'Are leadership roles considered?', 'Yes, leadership and extracurriculars can improve chances.'),
(1, 'When are awards announced?', 'Typically within 2 months after the application deadline.'),

-- Need-based Scholarships
(2, 'Who qualifies for need-based scholarships?', 'Students with demonstrated financial need.'),
(2, 'Do I need to submit tax documents?', 'Yes, usually recent tax returns are required.'),
(2, 'Can international students apply?', 'Yes, some programs accept international students.'),
(2, 'Is there an age limit?', 'Generally no, as long as you meet program requirements.'),

-- International Scholarships
(3, 'Are there scholarships for study abroad?', 'Yes, universities and governments offer various programs.'),
(3, 'Do I need a student visa to apply?', 'Yes, visa eligibility is required.'),
(3, 'Are English tests required?', 'Most scholarships require TOEFL or IELTS.'),
(3, 'Can I apply mid-year?', 'Some scholarships accept rolling applications.'),

-- Special Awards
(4, 'What are special awards?', 'Awards given for exceptional talents or achievements beyond academics.'),
(4, 'How do I nominate someone?', 'Submit a nomination form available on the university website.'),
(4, 'Are these competitive?', 'Yes, very selective.'),
(4, 'Can alumni nominate?', 'Yes, alumni can participate in nominations.'),

-- Undergraduate Admissions
(5, 'When is the application deadline?', 'Usually March 31st each year.'),
(5, 'What documents are required?', 'Transcripts, recommendation letters, and personal statement.'),
(5, 'Can I apply after the deadline?', 'Late applications may be considered on a case-by-case basis.'),
(5, 'Are interviews required?', 'Some programs require interviews.'),
(5, 'Is there an application fee?', 'Yes, typically $50-$100.'),

-- Postgraduate Admissions
(6, 'What are the requirements for a Master’s program?', 'Bachelor’s degree, transcripts, CV, and possibly GRE scores.'),
(6, 'Are research proposals required?', 'For research programs, yes.'),
(6, 'Can I apply without work experience?', 'Some programs allow it, others prefer experience.'),
(6, 'Is there financial support?', 'Some programs provide assistantships and scholarships.'),

-- Transfer Students
(7, 'Can I transfer from another university?', 'Yes, transfer applications are accepted each semester.'),
(7, 'Do credits transfer?', 'Depends on course equivalency and grades.'),
(7, 'Is GPA considered?', 'Yes, a minimum GPA is required.'),
(7, 'Are interviews required?', 'Sometimes, especially for competitive programs.'),

-- International Students
(8, 'Do I need a student visa?', 'Yes, visa is mandatory.'),
(8, 'Is English proficiency required?', 'Yes, usually TOEFL/IELTS.'),
(8, 'Are international scholarships available?', 'Yes, several merit-based and need-based scholarships.'),
(8, 'Do I need health insurance?', 'Yes, proof of insurance is usually required.'),

-- Medicine
(9, 'What are the prerequisites?', 'Biology, Chemistry, Physics.'),
(9, 'Is there an entrance exam?', 'Yes, MCAT or equivalent may be required.'),
(9, 'How competitive is admission?', 'Very competitive, usually top 5% of applicants.'),
(9, 'Are clinical placements included?', 'Yes, mandatory clinical rotations.'),
(9, 'How long is the program?', 'Typically 5–6 years.'),

-- Engineering
(10, 'Do I need Math for Engineering?', 'Yes, Math and Physics required.'),
(10, 'Are internships mandatory?', 'Yes, at least one internship.'),
(10, 'Can I specialize?', 'Yes, in fields like Mechanical, Civil, or Electrical.'),
(10, 'Is lab work required?', 'Yes, practical labs are mandatory.'),

-- Arts & Humanities
(11, 'Do I need a portfolio?', 'Yes, for Fine Arts or Design.'),
(11, 'Are language requirements strict?', 'Yes, proficiency in the language of instruction.'),
(11, 'Are study abroad opportunities available?', 'Yes, some programs include exchange semesters.'),
(11, 'Can I combine majors?', 'Yes, double majors are possible in some cases.'),

-- Business & Economics
(12, 'Is work experience required?', 'Not for undergrad, yes for postgrad.'),
(12, 'Are internships mandatory?', 'Yes, for experiential learning.'),
(12, 'Can I take electives outside business?', 'Yes, within credit limits.'),
(12, 'Are case competitions available?', 'Yes, organized by clubs and faculty.'),

-- Computer Science
(13, 'Do I need programming experience?', 'Not mandatory, but recommended.'),
(13, 'Are hackathons supported?', 'Yes, often organized by CS clubs.'),
(13, 'Can I specialize?', 'Yes, in AI, ML, cybersecurity, etc.'),

-- Law
(14, 'Are LSAT scores required?', 'Yes, for most law programs.'),
(14, 'Is internships mandatory?', 'Yes, usually at legal firms.'),
(14, 'Are international law courses offered?', 'Yes, many programs offer electives.'),

-- Education
(15, 'Do I need teaching experience?', 'Some programs prefer prior experience.'),
(15, 'Are field placements included?', 'Yes, practical teaching sessions are mandatory.'),

-- Social Sciences
(16, 'Are research projects required?', 'Yes, for final year.'),
(16, 'Can I specialize?', 'Yes, options like Psychology, Sociology, etc.'),

-- Campus Life
(17, 'How many clubs can I join?', 'As many as you like.'),
(17, 'Are student elections held?', 'Yes, annually.'),
(17, 'Are there student counseling services?', 'Yes, confidential support is available.'),

-- Sports & Recreation
(18, 'Is gym access free?', 'Usually included in student fees.'),
(18, 'Can I join sports teams?', 'Yes, tryouts are held each semester.'),
(18, 'Are intramural leagues available?', 'Yes, for casual participation.'),

-- Events & Festivals
(19, 'How can I participate in events?', 'Sign up through student portal or clubs.'),
(19, 'Are events free?', 'Some are free, others require a small fee.'),

-- Health & Wellness
(20, 'Is there a campus health center?', 'Yes, available to all students.'),
(20, 'Are mental health services available?', 'Yes, counseling and therapy sessions are offered.'),
(20, 'Are vaccinations required?', 'Yes, some immunizations may be mandatory.'),

-- Student Support Services
(21, 'Is academic tutoring available?', 'Yes, free tutoring for students.'),
(21, 'Is disability support offered?', 'Yes, accommodations are provided for students with disabilities.'),
(21, 'Is career counseling available?', 'Yes, through career services.'),
(21, 'Are mentorship programs available?', 'Yes, peer and faculty mentorship programs exist.'),

-- Housing & Accommodation
(22, 'How do I apply for on-campus housing?', 'Submit housing application online.'),
(22, 'Is housing guaranteed?', 'Yes, for first-year students.'),
(23, 'Can I live off-campus?', 'Yes, with prior approval.'),
(23, 'Are roommates assigned?', 'Yes, based on preferences and availability.'),
(24, 'Are there international student dorms?', 'Yes, specifically for international students.'),
(24, 'Can I choose my room?', 'Sometimes, based on availability.'),

-- Fees & Payment
(25, 'When is tuition due?', 'Start of each semester.'),
(25, 'Can I pay in installments?', 'Yes, payment plans are available.'),
(25, 'Are late fees charged?', 'Yes, if payment is delayed.'),
(26, 'Are scholarships deducted from fees?', 'Yes, if approved.'),
(26, 'Can I request a refund?', 'Yes, subject to university policies.'),
(27, 'What if I withdraw mid-semester?', 'Refunds are prorated based on withdrawal date.'),

-- Exams & Grading
(28, 'Where can I find the exam schedule?', 'Student portal.'),
(28, 'Are exams online?', 'Depends on course.'),
(29, 'What grading system is used?', 'Letter grades A-F or GPA 0-4.0.'),
(29, 'Can I retake an exam?', 'Yes, according to university policy.'),
(30, 'Are there final exams for every course?', 'Most courses have final exams.'),

-- Career Services
(31, 'How do I apply for internships?', 'Through career portal.'),
(31, 'Are internships paid?', 'Some are paid, others are unpaid.'),
(32, 'Are job placements guaranteed?', 'No, support provided but not guaranteed.'),
(32, 'Are career workshops offered?', 'Yes, resume writing, interview prep, networking.'),
(33, 'Can alumni access career services?', 'Yes, for a limited time after graduation.');
