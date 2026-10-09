import React, { useState } from 'react';
import { 
  PlusCircle, MapPin, Calendar, Send, Info, ShieldAlert 
} from 'lucide-react';
import DataBadge from '../components/DataBadge';
import { 
  CAUTION_ZONES, 
  REPORT_CATEGORIES 
} from '../data/safetyData';
import { addCitizenReport } from '../utils/storage';

export default function SafetyPage({ 
  citizenReports, 
  onReportSubmitted, 
  showToast 
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form State
  const [formCategory, setFormCategory] = useState('road_hazard');
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formNeighbourhood, setFormNeighbourhood] = useState('');
  const [formSeverity, setFormSeverity] = useState('Medium');
  const [formDescription, setFormDescription] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Form submission validation
  const handleSubmitReport = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formTitle.trim()) errors.title = 'Please provide a brief title.';
    if (!formLocation.trim()) errors.location = 'Specific landmark or street location is required.';
    if (!formDescription.trim() || formDescription.trim().length < 15) {
      errors.description = 'Please provide a helpful description (at least 15 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Save report to LocalStorage
    const newReport = addCitizenReport({
      category: formCategory,
      title: formTitle.trim(),
      location: formLocation.trim(),
      neighbourhood: formNeighbourhood.trim() || 'Pune City',
      severity: formSeverity,
      description: formDescription.trim(),
      status: 'Citizen Report (Unverified)'
    });

    onReportSubmitted(newReport);
    showToast('Report submitted successfully! Stored locally and awaiting review.', 'success');

    // Reset Form
    setFormTitle('');
    setFormLocation('');
    setFormNeighbourhood('');
    setFormDescription('');
    setFormSeverity('Medium');
    setFormErrors({});
    setShowSubmitModal(false);
  };

  // Filtered reports
  const filteredReports = filterCategory === 'all'
    ? citizenReports
    : citizenReports.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header and Disclaimers */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE7F2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Safety Insights & Citizen Alerts
            </h1>
            <DataBadge type="demo" label="Community Demonstration Feed" size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Transparent incident awareness, caution zones, and crowdsourced civic reporting
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Citizen Report</span>
        </button>
      </div>

      {/* Transparent Disclaimer Banner */}
      <div className="bg-[#EAF4FF] rounded-2xl border border-[#DCE7F2] p-4 sm:p-5 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white text-[#2864A6] shadow-2xs flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-[#334155] leading-relaxed">
          <h2 className="font-bold text-[#183B5B] text-sm font-['Plus_Jakarta_Sans']">
            Platform Transparency & Emergency Disclaimer
          </h2>
          <p>
            CityLoom does <strong>not</strong> operate an official police dispatch or emergency response system. 
            All incidents listed below are either <strong>sample demonstration reports</strong> or 
            <strong> unverified community submissions</strong> saved locally in your browser. 
            No location or travel route can ever be guaranteed as completely safe. For immediate life-safety emergencies in Pune, dial <strong>112 (National Emergency)</strong> or <strong>108 (Ambulance)</strong>.
          </p>
        </div>
      </div>

      {/* Caution Zones Strip (Accident-Prone Areas) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <h2 className="text-lg font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Demonstration Caution & Accident-Prone Zones
            </h2>
          </div>
          <DataBadge type="sample" label="Sample City Data" size="xs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAUTION_ZONES.map((zone) => (
            <div 
              key={zone.id}
              className="bg-white rounded-xl border border-[#DCE7F2] p-4 shadow-2xs flex flex-col justify-between space-y-2 hover:border-amber-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {zone.type}
                  </span>
                  <span className="text-[10px] text-[#64748B]">Simulated</span>
                </div>
                <h3 className="font-bold text-xs text-[#183B5B] leading-tight">
                  {zone.zoneName}
                </h3>
                <p className="text-[11px] text-[#64748B] mt-1.5 leading-relaxed">
                  {zone.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-[#334155] bg-slate-50 p-2 rounded-lg">
                <strong className="text-[#183B5B]">Safety Tip: </strong>
                {zone.recommendation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Incident Feed & Filters */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Incident Feed ({filteredReports.length})
            </h2>
            <p className="text-xs text-[#64748B]">
              Latest road hazards, lighting notices, and citizen submissions
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                filterCategory === 'all'
                  ? 'bg-[#2864A6] text-white border-[#2864A6]'
                  : 'bg-white text-[#334155] border-[#DCE7F2] hover:bg-[#EAF4FF]'
              }`}
            >
              All Reports
            </button>
            {REPORT_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setFilterCategory(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  filterCategory === cat.value
                    ? 'bg-[#2864A6] text-white border-[#2864A6]'
                    : 'bg-white text-[#334155] border-[#DCE7F2] hover:bg-[#EAF4FF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const isUserReport = !report.isSample;
            return (
              <div 
                key={report.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition-all space-y-3 ${
                  isUserReport 
                    ? 'border-amber-300 ring-1 ring-amber-100' 
                    : 'border-[#DCE7F2]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-[#2864A6] bg-[#EAF4FF] px-2 py-0.5 rounded-md uppercase">
                        {report.category.replace('_', ' ')}
                      </span>
                      
                      {isUserReport ? (
                        <DataBadge type="unverified" label="Citizen Report (Unverified)" size="xs" />
                      ) : (
                        <DataBadge type="sample" label="Demonstration Incident" size="xs" />
                      )}

                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        report.severity === 'High' ? 'bg-rose-100 text-rose-800' :
                        report.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {report.severity} Severity
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                      {report.title}
                    </h3>
                  </div>

                  <div className="text-right text-[11px] text-[#64748B]">
                    <div className="flex items-center gap-1 sm:justify-end">
                      <Calendar className="w-3.5 h-3.5 text-[#2864A6]" />
                      <span>{report.date} at {report.time}</span>
                    </div>
                    <span className="block mt-0.5">By {report.reportedBy}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#2864A6] font-medium">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{report.location} ({report.neighbourhood})</span>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
                  {report.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                  <span>Status: <strong>{report.status}</strong></span>
                  <span className="italic text-[10px]">Information may be incomplete or awaiting field verification.</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Citizen Report Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#DCE7F2] space-y-4 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                  Submit a Citizen Hazard or Safety Report
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Help fellow citizens stay informed about local street conditions
                </p>
              </div>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              
              {/* Category */}
              <div>
                <label className="font-bold text-[#183B5B] block mb-1">
                  Category *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DCE7F2] bg-white text-xs font-medium text-[#183B5B] focus:outline-hidden focus:border-[#2864A6]"
                >
                  {REPORT_CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="font-bold text-[#183B5B] block mb-1">
                  Brief Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Broken pavement slabs along footpath"
                  className={`w-full p-2.5 rounded-xl border bg-white text-xs text-[#183B5B] focus:outline-hidden ${
                    formErrors.title ? 'border-rose-400 ring-1 ring-rose-200' : 'border-[#DCE7F2] focus:border-[#2864A6]'
                  }`}
                />
                {formErrors.title && <span className="text-[11px] text-rose-600 mt-0.5 block">{formErrors.title}</span>}
              </div>

              {/* Location & Neighbourhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#183B5B] block mb-1">
                    Landmark / Street Address *
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Near Deccan Gymkhana Bus Stop"
                    className={`w-full p-2.5 rounded-xl border bg-white text-xs text-[#183B5B] focus:outline-hidden ${
                      formErrors.location ? 'border-rose-400 ring-1 ring-rose-200' : 'border-[#DCE7F2] focus:border-[#2864A6]'
                    }`}
                  />
                  {formErrors.location && <span className="text-[11px] text-rose-600 mt-0.5 block">{formErrors.location}</span>}
                </div>

                <div>
                  <label className="font-bold text-[#183B5B] block mb-1">
                    Neighbourhood
                  </label>
                  <input
                    type="text"
                    value={formNeighbourhood}
                    onChange={(e) => setFormNeighbourhood(e.target.value)}
                    placeholder="e.g. Deccan / FC Road"
                    className="w-full p-2.5 rounded-xl border border-[#DCE7F2] bg-white text-xs text-[#183B5B] focus:outline-hidden focus:border-[#2864A6]"
                  />
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="font-bold text-[#183B5B] block mb-1">
                  Perceived Severity
                </label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map((sev) => (
                    <label 
                      key={sev} 
                      className={`flex-1 p-2 rounded-xl border text-center cursor-pointer font-semibold transition-all ${
                        formSeverity === sev 
                          ? 'bg-[#EAF4FF] border-[#2864A6] text-[#2864A6]' 
                          : 'bg-white border-[#DCE7F2] text-[#64748B]'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="severity" 
                        value={sev} 
                        checked={formSeverity === sev}
                        onChange={() => setFormSeverity(sev)}
                        className="sr-only" 
                      />
                      <span>{sev}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-[#183B5B] block mb-1">
                  Detailed Observation *
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the issue clearly, mentioning specific hazards to pedestrians, cyclists, or motorists..."
                  className={`w-full p-2.5 rounded-xl border bg-white text-xs text-[#183B5B] focus:outline-hidden ${
                    formErrors.description ? 'border-rose-400 ring-1 ring-rose-200' : 'border-[#DCE7F2] focus:border-[#2864A6]'
                  }`}
                />
                {formErrors.description && <span className="text-[11px] text-rose-600 mt-0.5 block">{formErrors.description}</span>}
              </div>

              {/* Form Disclosure */}
              <div className="bg-[#EAF4FF] p-3 rounded-xl text-[11px] text-[#334155] leading-relaxed">
                <strong>Notice: </strong>
                Your report will be stored in your local browser storage and displayed as an 
                <em> Unverified Community Report</em>. It is not forwarded to emergency authorities.
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#183B5B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Report</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
