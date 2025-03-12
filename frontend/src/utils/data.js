export const students = function (props) {
    return React.createElement("div", { key: props.id },
      React.createElement("h3", null, props.name),
      React.createElement("p", null, `Department: ${props.department}`),
      React.createElement("p", null, `Company: ${props.company}`),
      React.createElement("p", null, `Position: ${props.position}`),
      React.createElement("p", null, `Status: ${props.status}`),
      React.createElement("p", null, `Package: ${props.package}`)
    );
  };
  
  export const Department = function (props) {
    return React.createElement("div", { key: props.id },
      React.createElement("p", null, props.name)
    );
  };
  
  export const Company = function (props) {
    return React.createElement("div", { key: props.id },
      React.createElement("p", null, props.name)
    );
  };
  
  export const EventType = function (props) {
    return React.createElement("div", { key: props.id },
      React.createElement("p", null, props.name)
    );
  };
  
  export const PlacementStats = function (props) {
    return React.createElement("div", null,
      React.createElement("h2", null, "Placement Stats"),
      React.createElement("p", null, `Total Placements: ${props.totalPlacements}`),
      React.createElement("p", null, `Average Package: ${props.averagePackage}`),
      React.createElement("p", null, `Top Hiring Company: ${props.topHiringCompany}`),
      React.createElement("h3", null, "Placements by Department"),
      ...props.placementsByDepartment.map(dept =>
        React.createElement("div", { key: dept.department },
          React.createElement("p", null, `${dept.department}: ${dept.placements}`)
        )
      ),
      React.createElement("h3", null, "Company Distribution"),
      ...props.companyDistribution.map(comp =>
        React.createElement("div", { key: comp.company },
          React.createElement("p", null, `${comp.company}: ${comp.percentage}%`)
        )
      )
    );
  };
  
  export const departments = [
    { id: "all", name: "All Departments" },
    { id: "cse", name: "Computer Science" },
    { id: "ece", name: "Electronics" },
    { id: "me", name: "Mechanical" },
    { id: "ce", name: "Civil" },
    { id: "pe", name: "Petroleum" }
  ];
  
  export const companies = [
    { id: "all", name: "All Companies" },
    { id: "tech-corp", name: "Tech Corp" },
    { id: "startup-inc", name: "StartUp Inc" },
    { id: "enterprise-co", name: "Enterprise Co" },
    { id: "innovation-ltd", name: "Innovation Ltd" },
    { id: "data-systems", name: "Data Systems" }
  ];
  
  export const placementStats = {
    totalPlacements: 245,
    averagePackage: "18.5 LPA",
    topHiringCompany: "Tech Corp",
    placementsByDepartment: [
      { department: "Computer Science", placements: 120 },
      { department: "Electronics", placements: 75 },
      { department: "Mechanical", placements: 60 },
      { department: "Civil", placements: 40 },
      { department: "Petroleum", placements: 30 }
    ],
    companyDistribution: [
      { company: "Tech Corp", percentage: 35 },
      { company: "StartUp Inc", percentage: 25 },
      { company: "Enterprise Co", percentage: 20 },
      { company: "Innovation Ltd", percentage: 15 },
      { company: "Others", percentage: 5 }
    ]
  };
  export const eventTypes = [
    { id: "all", name: "All Event Types" },
    { id: "placement-drive", name: "Placement Drive" },
    { id: "internship", name: "Internship" },
    { id: "workshop", name: "Workshop" },
    { id: "hackathon", name: "Hackathon" }
  ];
  export const years = [
    { id: "all", name: "All Years" },
    { id: "2024", name: "2024" },
    { id: "2023", name: "2023" },
    { id: "2022", name: "2022" },
    { id: "2021", name: "2021" },
  ];
  // Technical event categories
export const technicalCategories = [
    { id: "hackathon", name: "Hackathon" },
    { id: "workshop", name: "Workshop" },
    { id: "competitions", name: "Competitions" },
    { id: "techfest-tathva", name: "TechnicalFest - Tathva" },
    { id: "techfest-other", name: "TechnicalFest of other colleges" },
    { id: "other", name: "Other" },
  ];
  
  // Cultural event categories
  export const culturalCategories = [
    { id: "hackathon", name: "Hackathon" },
    { id: "workshop", name: "Workshop" },
    { id: "competitions", name: "Competitions" },
    { id: "cultfest-ragam", name: "CulturalFest - Ragam" },
    { id: "cultfest-other", name: "CulturalFest of other colleges" },
    { id: "other", name: "Other" },
  ];
  
  // Sports types
  export const sportsTypes = [
    { id: "inter-dept", name: "Inter Department" },
    { id: "inter-nit", name: "Inter NIT" },
    { id: "inter-college", name: "Inter College" },
    { id: "inter-hostel", name: "Inter Hostel" },
    { id: "other", name: "Other" },
  ];
  
  // Sports categories
  export const sportsCategories = [
    { id: "kabaddi", name: "Kabaddi" },
    { id: "basketball", name: "Basketball" },
    { id: "handball", name: "Handball" },
    { id: "cricket", name: "Cricket" },
    { id: "hockey", name: "Hockey" },
    { id: "other", name: "Other" },
  ];
  
  // Club categories
  export const clubCategories = [
    { id: "cultural-club", name: "Cultural Club" },
    { id: "technical-club", name: "Technical Club" },
    { id: "hometeam", name: "Hometeam" },
    { id: "society", name: "Society" },
    { id: "other", name: "Other" },
  ];
  export const clubMemberships = [
    { id: 1, clubName: "Code Club", position: "President", category: "Technical Club", startDate: "2022-08-01", endDate: "2023-07-31" },
    { id: 2, clubName: "Music Club", position: "Member", category: "Cultural Club", startDate: "2022-09-15", endDate: "2023-09-14" },
    { id: 3, clubName: "IEEE Student Chapter", position: "Secretary", category: "Society", startDate: "2022-07-01", endDate: "2023-06-30" },
    { id: 4, clubName: "Dance Troupe", position: "Performer", category: "Cultural Club", startDate: "2022-10-01", endDate: "2023-09-30" },
    { id: 5, clubName: "Robotics Club", position: "Technical Lead", category: "Technical Club", startDate: "2022-08-15", endDate: "2023-08-14" },
  ];

  export const technicalEvents= [
    { id: 1, eventName: "CodeFest 2023", host: "Tech Institute", category: "Hackathon", achievement: "First Place", date: "2023-05-15" },
    { id: 2, eventName: "WebDev Workshop", host: "CS Department", category: "Workshop", achievement: "Participation", date: "2023-06-22" },
    { id: 3, eventName: "Algorithm Challenge", host: "CodeChef", category: "Competitions", achievement: "Third Place", date: "2023-07-10" },
    { id: 4, eventName: "Tathva Hackathon", host: "NIT Calicut", category: "TechnicalFest - Tathva", achievement: "Second Place", date: "2023-10-05" },
    { id: 5, eventName: "ML Competition", host: "IIT Madras", category: "TechnicalFest of other colleges", achievement: "Participation", date: "2023-11-12" },
  ];
  
  // Mock cultural events data
  export const culturalEvents = [
    { id: 1, eventName: "Dance Competition", host: "Arts Council", category: "Competitions", achievement: "First Place", date: "2023-04-18" },
    { id: 2, eventName: "Music Festival", host: "Cultural Committee", category: "CulturalFest - Ragam", achievement: "Second Place", date: "2023-03-10" },
    { id: 3, eventName: "Theater Workshop", host: "Drama Club", category: "Workshop", achievement: "Participation", date: "2023-07-22" },
    { id: 4, eventName: "Art Exhibition", host: "Fine Arts Club", category: "Other", achievement: "Best Display", date: "2023-09-15" },
    { id: 5, eventName: "Poetry Slam", host: "Literary Club", category: "Competitions", achievement: "Third Place", date: "2023-11-05" },
  ];
  
  // Mock sports events data
  export const sportsEvents  = [
    { id: 1, eventName: "Basketball Tournament", role: "Team Captain", type: "Inter Department", category: "Basketball", achievement: "Champions", date: "2023-02-15" },
    { id: 2, eventName: "Cricket Match", role: "Bowler", type: "Inter College", category: "Cricket", achievement: "Runner-up", date: "2023-03-22" },
    { id: 3, eventName: "Kabaddi League", role: "Player", type: "Inter NIT", category: "Kabaddi", achievement: "Third Place", date: "2023-05-10" },
    { id: 4, eventName: "Hockey Cup", role: "Goalkeeper", type: "Inter Hostel", category: "Hockey", achievement: "Champions", date: "2023-08-18" },
    { id: 5, eventName: "Handball Match", role: "Player", type: "Inter Department", category: "Handball", achievement: "Participation", date: "2023-10-05" },
  ];
  export const eventStats = {
    totalEvents: 42,
    upcomingEvents: 3,
    totalParticipants: 1250,
    eventsByType: [
      { type: "Workshop", count: 15 },
      { type: "Hackathon", count: 8 },
      { type: "Seminar", count: 12 },
      { type: "Recruitment Drive", count: 7 },
    ],
    participationByDepartment: [
      { department: "Computer Science", participants: 500 },
      { department: "Electronics", participants: 320 },
      { department: "Mechanical", participants: 210 },
      { department: "Civil", participants: 150 },
      { department: "Petroleum", participants: 70 },
    ]
  };
  