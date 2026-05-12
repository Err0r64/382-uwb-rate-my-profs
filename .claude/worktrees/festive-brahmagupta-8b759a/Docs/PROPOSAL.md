# Feedback from Claude

Rate my professor, but only for University of Washington (cross-campus) students. Provides the Rate My Professor service, with the guarantee that a current student has taken the course. This will be done by requiring students to SSO with their UwNetID.

Not only will it provide a student's anecdotal review, but an embedded AI will (hopefully) have access to the anonymous course reviews, the numerical rating scales we have each quarter, and the accompanying written responses. The AI will take the data as input and formulate a summary/overview of the general kinds of feedback the professor receives in the written feedback, as well as an interpretation of the numerical ratings for each category in plain English.

**Claude.AI**

Score: 4/5

Strong proposal. UW-exclusive scope with SSO authentication shows thoughtful problem selection, and AI-generated summaries of feedback is a genuinely meaningful NLP integration (not just a side-chat). To reach 5/5, flesh out the architecture: which model powers the summaries, how do you handle sparse review data for newer professors, and what measures prevent gaming of the rating system?

---

# Revision

Rate my professor, but only for University of Washington (cross-campus) students. Provides the Rate My Professor service, with the guarantee that a current student has taken the course. This will be done by requiring students to SSO with their UwNetID.

Not only will it provide a student's anecdotal review, but an embedded AI will (hopefully) also have access to the anonymous course reviews, including the numerical rating scales we have each quarter. Unfortunately, after further research, the IASystem for students’ written anecdotal responses is unavailable to students, and even professors seem to have access only to their individual evaluations.

We will get around this by scraping anonymous student responses from Rate My Professors for each University of Washington professor’s page. Not only that, but there will be a feature that allows students to form and post rate-my-professor-style written reviews for said professor, with the ratings and filters that come with them.

That being said, even though we will keep students anonymous, they will be traceable if disorderly conduct violates the University’s policies. Posts can be removed by an administrative entity, but the student remains anonymous unless the University provides an explicit citation of violated policies and the need to subpoena.

The goal is to enable students to critically evaluate those in charge of their education while holding them accountable for misconduct. 

The AI will take the data as input, written in qualitative and quantitative forms, and formulate a summary/overview of the general kinds of feedback the professor receives in the written feedback, as well as an interpretation of the numerical ratings for each category in plain English.

Other non-AI requirements will primarily reflect the capabilities of the Rate My Professor Platform.

---

# Milestones

## Week 1-2: Planning and Diagram

- Structure of data in the website
- How will the embedded AI work?
- Determining Tech Stack
    - Front end language
    - Back end language
    - Choice of AI
- Activity Diagram - Optional with reasonable structured plan
- Domain Diagram - Optional with reasonable structured plan
- Process Diagrams - Optional with reasonable structured plan
- All of the diagrams - Optional with reasonable structured plan

## Week 3-4: Scaffolding Code and Data gathering

- Extract Rate my professor data for the university of Washington
    - Potentially requires a custom defined website scraper.
- Extract numerical course evaluation data for the university of Washington.
- Deploy sandbox webpage
    - For simple HTML text structure and display of data

## Week 5-6: MVP

- Must be able to SSO auth using your University of Washington email.
- Users should be able to query 2-6 University of Washington - BOTHELL professors that the Webpage should display.
    - Information that must be displayed:
        - Course evaluation numerical ordinal ratings
        - Written reviews: Verified Student reviews and non-verified Rate my professor reviews.
- Users must be able to create a review:
    - Review must contain:
        - Course Code
        - Numerical ordinal rating
        - Numerical Difficulty rating
        - Would you take this professor again?
        - Written review.
    - Optional criteria
        - Was this class taken for credit?
        - Did this professor use textbooks?
        - Was attendance necessary? (Different from mandatory)
        - Was attendance mandatory?
        - Grade received
        - Tags to select from