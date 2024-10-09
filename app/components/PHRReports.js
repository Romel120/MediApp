import Image from "next/image";

const PHRReports = () => {
    const phrReports = [
      { id: 1, title: 'BMI', icon: '/assets/bmi.jpg' },
      { id: 2, title: 'Blood Pressure', icon: '/assets/bp.jpg' },
      { id: 3, title: 'CBC Report', icon: '/assets/cbc.jpg' },
      { id: 4, title: 'Glucose [Sugar]', icon: '/assets/sugar.jpg' },
      { id: 5, title: 'Lipid Report', icon: '/assets/lipid.jpg' },
      { id: 6, title: 'Kidney Function', icon: '/assets/kidney.jpg' },
      { id: 7, title: 'Urine Profile', icon: '/assets/urine.jpg' },
      { id: 8, title: 'Electrolytes Report', icon: '/assets/electrolytes.jpg' },
      { id: 9, title: 'Thyroid Function', icon: '/assets/thyroid.jpg' },
      { id: 10, title: 'Tumor Marker', icon: '/assets/tumor.jpg' },
      { id: 11, title: 'Serology Report', icon: '/assets/serology.jpg' },
      { id: 12, title: 'Liver Function', icon: '/assets/liver.jpg' },
      { id: 13, title: 'Covid-19 Vaccine', icon: '/assets/covid.jpg' },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-0">
        {phrReports.map((report) => (
          <div key={report.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center h-3/4">
            <Image src={report.icon} alt={report.title} width={500} height={500} className="mb-2 w-full h-3/4" />
            <h2 className="text-xl font-semibold">{report.title}</h2>
            
          </div>
        ))}
      </div>
    );
  };
  
  export default PHRReports;
  