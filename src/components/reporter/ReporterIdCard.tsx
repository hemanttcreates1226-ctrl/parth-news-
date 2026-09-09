import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode as QrIcon } from 'lucide-react';
import { Reporter, IdCardRecord } from '../../types';
import { ParthNewsLogo } from '../common/ParthNewsLogo';

interface ReporterIdCardProps {
  reporter: Reporter | IdCardRecord;
  id?: string;
  showBack?: boolean;
  className?: string;
}

export const ReporterIdCard: React.FC<ReporterIdCardProps> = ({
  reporter,
  id = 'reporter-id-card-element',
  showBack = false,
  className = ''
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const reporterName = 'name' in reporter ? reporter.name : reporter.reporterName;

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://parthnews.in';
    const verifyUrl = `${origin}/verify-reporter/${reporter.reporterId}`;
    
    QRCode.toDataURL(verifyUrl, {
      width: 180,
      margin: 1,
      color: {
        dark: '#111111',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('QR generation error:', err);
    });
  }, [reporter.reporterId]);

  const isActive = reporter.status === 'active';

  return (
    <div 
      id={id} 
      className={`flex flex-col sm:flex-row gap-6 justify-center items-center select-none ${className}`}
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Front Side */}
      <div 
        className="w-[340px] sm:w-[360px] h-[540px] rounded-2xl overflow-hidden relative flex flex-col justify-between"
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #990000',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Holographic / Guilloche Security Pattern Header */}
        <div 
          className="p-4 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #990000 0%, #C8102E 50%, #990000 100%)',
            color: '#FFFFFF'
          }}
        >
          {/* Subtle security pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]"></div>
          
          <div className="flex justify-center mb-1 relative z-10">
            <ParthNewsLogo variant="idcard" size="sm" light />
          </div>

          <div 
            className="text-[10px] font-bold uppercase tracking-widest mt-0.5 relative z-10"
            style={{ color: '#FECACA' }}
          >
            OFFICIAL PRESS IDENTITY CARD
          </div>
          <div 
            className="text-[9px] font-hindi font-semibold relative z-10"
            style={{ color: '#FDE68A' }}
          >
            सूचना एवं प्रसारण डिजिटल मीडिया पहचान पत्र
          </div>
        </div>

        {/* Identity Body */}
        <div 
          className="p-4 flex-1 flex flex-col items-center justify-between text-center relative"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div 
              className="w-48 h-48 rounded-full flex items-center justify-center"
              style={{ border: '8px solid #990000' }}
            >
              <span className="font-hindi text-6xl font-black" style={{ color: '#990000' }}>प</span>
            </div>
          </div>

          {/* Photo with Official Red Frame & Security Stamp */}
          <div className="relative mt-1">
            <div 
              className="w-28 h-32 rounded-lg overflow-hidden p-0.5"
              style={{
                border: '2px solid #C8102E',
                backgroundColor: '#F3F4F6',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <img 
                src={reporter.photo} 
                alt={reporterName}
                className="w-full h-full object-cover rounded"
                crossOrigin="anonymous"
              />
            </div>
            
            {/* Status Stamp */}
            <div 
              className="absolute -bottom-2 -right-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: isActive ? '#059669' : '#B91C1C',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {isActive ? '✓ VERIFIED' : 'INACTIVE'}
            </div>
          </div>

          {/* Reporter Name & Role */}
          <div className="mt-2 space-y-0.5">
            <h3 
              className="text-base font-extrabold font-hindi leading-tight"
              style={{ color: '#111827' }}
            >
              {reporterName}
            </h3>
            <div 
              className="inline-block text-[11px] font-black px-3 py-0.5 rounded uppercase tracking-wider"
              style={{
                backgroundColor: '#171717',
                color: '#FFFFFF'
              }}
            >
              {reporter.designation || 'PRESS REPORTER'}
            </div>
          </div>

          {/* ID Details Grid */}
          <div 
            className="w-full rounded-lg p-2.5 text-xs text-left space-y-1 mt-2"
            style={{
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB'
            }}
          >
            <div 
              className="flex justify-between items-center pb-1"
              style={{ borderBottom: '1px solid #E5E7EB' }}
            >
              <span className="font-medium" style={{ color: '#6B7280' }}>Card / Press ID:</span>
              <span 
                className="font-mono font-bold tracking-wider text-xs"
                style={{ color: '#C8102E' }}
              >
                {reporter.reporterId}
              </span>
            </div>

            <div 
              className="flex justify-between items-center pb-1"
              style={{ borderBottom: '1px solid #E5E7EB' }}
            >
              <span className="font-medium" style={{ color: '#6B7280' }}>District / State:</span>
              <span className="font-bold text-[11px]" style={{ color: '#1F2937' }}>
                {reporter.district}, {reporter.state}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <div>
                <span className="block text-[9px]" style={{ color: '#6B7280' }}>Issue Date:</span>
                <span className="font-semibold" style={{ color: '#374151' }}>{reporter.issueDate}</span>
              </div>
              <div className="text-right">
                <span className="block text-[9px]" style={{ color: '#6B7280' }}>Valid Until:</span>
                <span className="font-bold" style={{ color: '#B91C1C' }}>{reporter.validUntil}</span>
              </div>
            </div>
          </div>

          {/* Bottom QR Code & Authorized Seal */}
          <div 
            className="w-full flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            {/* QR Code */}
            <div className="flex items-center gap-1.5 text-left">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt="Verification QR" 
                  className="w-12 h-12 rounded p-0.5"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D1D5DB'
                  }}
                />
              ) : (
                <div 
                  className="w-12 h-12 rounded flex items-center justify-center"
                  style={{ backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB' }}
                >
                  <QrIcon className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                </div>
              )}
              <div className="text-[9px] leading-tight" style={{ color: '#6B7280' }}>
                <span className="font-bold block" style={{ color: '#374151' }}>Scan to Verify</span>
                <span>parthnews.in</span>
              </div>
            </div>

            {/* Chief Editor Signature / Stamp */}
            <div className="text-right">
              <div 
                className="font-serif italic text-xs font-bold pb-0.5 px-2"
                style={{
                  color: '#262626',
                  borderBottom: '1px solid #A3A3A3'
                }}
              >
                Hemant Kumar
              </div>
              <span 
                className="text-[9px] font-bold uppercase block mt-0.5"
                style={{ color: '#C8102E' }}
              >
                Chief Editor / निदेशक
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Stripe */}
        <div 
          className="text-[9px] py-1.5 px-3 flex justify-between items-center"
          style={{
            backgroundColor: '#171717',
            color: '#FFFFFF'
          }}
        >
          <span className="font-hindi font-semibold" style={{ color: '#FCA5A5' }}>
            सच के साथ, एक कदम आगे
          </span>
          <span className="font-mono" style={{ color: '#9CA3AF' }}>PARTH-PRESS-SECURED</span>
        </div>
      </div>

      {/* Back Side (Optional / Included for official complete ID download) */}
      {showBack && (
        <div 
          className="w-[340px] sm:w-[360px] h-[540px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-4 text-xs"
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #262626',
            color: '#374151',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div>
            <div 
              className="text-center pb-3"
              style={{ borderBottom: '1px solid #E5E7EB' }}
            >
              <h4 
                className="font-bold text-sm uppercase tracking-wider"
                style={{ color: '#C8102E' }}
              >
                PARTH NEWS DIGITAL MEDIA
              </h4>
              <p className="font-hindi text-[11px]" style={{ color: '#4B5563' }}>
                पार्थ न्यूज़ नेटवर्क — राष्ट्रीय एवं प्रांतीय पत्रकारिता संगठन
              </p>
            </div>

            {/* Terms / Instructions */}
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed" style={{ color: '#4B5563' }}>
              <div 
                className="font-bold uppercase text-[10px] tracking-wide"
                style={{ color: '#111827' }}
              >
                Instructions & Code of Ethics (नियम व शर्तें):
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li>This card is the exclusive property of <strong>Parth News</strong>.</li>
                <li>The bearer is an authorized press correspondent for field reporting and news gathering.</li>
                <li>Authorities and police departments are requested to extend full cooperation and press privileges.</li>
                <li>In case of loss or theft, immediately report to the editor bureau.</li>
                <li>Misuse of this card is strictly prohibited and subject to legal action.</li>
              </ul>
            </div>
          </div>

          {/* Bureau Contact & Seal */}
          <div 
            className="space-y-2 pt-3 p-2.5 rounded-lg text-[10px]"
            style={{
              backgroundColor: '#F9FAFB',
              borderTop: '1px solid #E5E7EB'
            }}
          >
            <div>
              <strong className="block" style={{ color: '#111827' }}>Head Bureau (प्रयागराज मुख्यालय):</strong>
              <p style={{ color: '#4B5563' }}>12-B/4 कस्तूरबा गांधी मार्ग, सिविल लाइन्स, प्रयागराज (उ.प्र.) 211001</p>
            </div>
            <div className="flex justify-between items-center" style={{ color: '#4B5563' }}>
              <span>Helpline: +91 98390 00000</span>
              <span>editor@parthnews.in</span>
            </div>
          </div>

          <div 
            className="text-center text-[9px] font-mono pt-1"
            style={{ color: '#9CA3AF' }}
          >
            VERIFICATION URL: https://parthnews.in/verify-reporter/{reporter.reporterId}
          </div>
        </div>
      )}
    </div>
  );
};
