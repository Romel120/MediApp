import Image from "next/image";

const PHRReports = () => {
    const phrReports = [
      { id: 1, title: 'Height, Weight & BMI', icon: '/assets/bmi.jpg' },
      { id: 2, title: 'Blood Pressure', icon: '/assets/bp.jpg' },
      { id: 3, title: 'CBC Report', icon: '/assets/bmi.jpg' },
      { id: 4, title: 'Glucose [Sugar]', icon: '/assets/bmi.jpg' },
      { id: 5, title: 'Lipid Report', icon: '/assets/bmi.jpg' },
      { id: 6, title: 'Kidney Function', icon: '/assets/bmi.jpg' },
      { id: 7, title: 'Urine Profile', icon: '/assets/bmi.jpg' },
      { id: 8, title: 'Electrolytes Report', icon: '/assets/bmi.jpg' },
      { id: 9, title: 'Thyroid Function', icon: '/assets/bmi.jpg' },
      { id: 10, title: 'Tumor Marker', icon: '/assets/bmi.jpg' },
      { id: 11, title: 'Serology Report', icon: '/assets/bmi.jpg' },
      { id: 12, title: 'Liver Function', icon: '/assets/bmi.jpg' },
      { id: 13, title: 'Covid-19 Vaccine', icon: '/assets/bmi.jpg' },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {phrReports.map((report) => (
          <div key={report.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
            {/* <button className="mt-2 bg-gray-200 rounded-full px-3 py-1 text-sm justify-end">
              ...
            </button> */}
            <Image src={report.icon} alt={report.title} width={500} height={500} className="mb-4 w-full" />
            <h2 className="text-xl font-semibold">{report.title}</h2>
            
          </div>
        ))}
      </div>
    );
  };
  
  export default PHRReports;
  