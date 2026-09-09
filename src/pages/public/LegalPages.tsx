import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, Scale, Lock, Eye } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalPages: React.FC<LegalPageProps> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {type === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <span className="bg-red-100 text-[#C8102E] text-xs font-bold px-3 py-1 rounded-full uppercase">
              LEGAL POLICY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900 mt-2">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p className="text-xs text-gray-500 mt-1">अंतिम अद्यतन: मार्च 2026 | पार्थ न्यूज़ डिजिटल मीडिया</p>
          </div>

          <div className="prose prose-red text-xs sm:text-sm text-gray-700 font-hindi space-y-4 leading-relaxed">
            <p>
              पार्थ न्यूज़ ("सच के साथ, एक कदम आगे") अपने पाठकों एवं संवाददाताओं की निजता के संरक्षण हेतु पूर्णतः प्रतिबद्ध है। यह नीति स्पष्ट करती है कि हमारे डिजिटल प्लेटफॉर्म द्वारा आपकी सूचनाओं का किस प्रकार संकलन, उपयोग एवं संरक्षण किया जाता है।
            </p>

            <h3 className="text-base font-bold text-gray-900">1. संकलित की जाने वाली सूचनाएं</h3>
            <p>
              जब आप हमारे पोर्टल पर न्यूज़लेटर सब्सक्राइब करते हैं, संपर्क फॉर्म भरते हैं, या संवाददाता (Reporter) हेतु आवेदन करते हैं, तब नाम, ईमेल, मोबाइल नंबर, शैक्षणिक विवरण, जनपद एवं पहचान पत्र संबंधी विवरण दर्ज किए जाते हैं।
            </p>

            <h3 className="text-base font-bold text-gray-900">2. सूचनाओं का उपयोग</h3>
            <p>
              - समाचार एवं संपादकीय सूचनाओं के संप्रेषण हेतु।<br />
              - संवाददाता भर्ती एवं आधिकारिक डिजिटल प्रेस आईडी कार्ड (QR-Verified ID) सत्यापन हेतु।<br />
              - भारतीय सूचना प्रौद्योगिकी (IT Act) नियमों के अनुपालन हेतु।
            </p>

            <h3 className="text-base font-bold text-gray-900">3. डेटा सुरक्षा एवं गोपनीयता</h3>
            <p>
              हम किसी भी उपयोगकर्ता या संवाददाता की निजी जानकारियों को व्यावसायिक लाभ हेतु किसी तीसरे पक्ष को साझा नहीं करते हैं। प्रेस कार्ड के क्यूआर कोड द्वारा केवल आधिकारिक सार्वजनिक क्रेडेंशियल ही प्रदर्शित किए जाते हैं।
            </p>
          </div>
        </div>
      )}

      {type === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <span className="bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              LEGAL TERMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900 mt-2">
              नियम एवं शर्तें (Terms of Service)
            </h1>
            <p className="text-xs text-gray-500 mt-1">अंतिम अद्यतन: मार्च 2026 | पार्थ न्यूज़ डिजिटल मीडिया</p>
          </div>

          <div className="prose prose-neutral text-xs sm:text-sm text-gray-700 font-hindi space-y-4 leading-relaxed">
            <p>
              पार्थ न्यूज़ की वेबसाइट, मोबाइल इंटरफेस अथवा डिजिटल सेवाओं का उपयोग करते समय आप निम्नलिखित विधिक शर्तों के अधीन हैं:
            </p>

            <h3 className="text-base font-bold text-gray-900">1. बौद्धिक संपदा एवं कॉपीराइट (Copyright)</h3>
            <p>
              पार्थ न्यूज़ पर प्रकाशित समस्त मूल समाचार, ग्राउंड रिपोर्ट, फोटोग्राफ, वीडियो एवं संपादकीय आलेख पार्थ न्यूज़ की अनन्य संपदा हैं। बिना लिखित अनुमति के इनका पुनरुत्पादन अथवा व्यावसायिक उपयोग पूर्णतः प्रतिबंधित है।
            </p>

            <h3 className="text-base font-bold text-gray-900">2. संवाददाता आचार संहिता (Reporter Code of Conduct)</h3>
            <p>
              पार्थ न्यूज़ से जुड़े सभी अधिकृत संवाददाता निष्पक्ष, प्रामाणिक एवं सत्यनिष्ठ पत्रकारिता हेतु बाध्य हैं। किसी भी भ्रामक, पक्षपाती या अवैध गतिविधि में संलिप्त पाए जाने पर डिजिटल प्रेस आईडी तत्काल प्रभाव से निरस्त कर दी जाएगी।
            </p>

            <h3 className="text-base font-bold text-gray-900">3. क्षेत्राधिकार (Jurisdiction)</h3>
            <p>
              किसी भी विधिक विवाद की स्थिति में न्यायिक क्षेत्राधिकार प्रयागराज (उत्तर प्रदेश) न्यायालय के अधीन रहेगा।
            </p>
          </div>
        </div>
      )}

      {type === 'disclaimer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
              EDITORIAL DISCLAIMER
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900 mt-2">
              अस्वीकरण (Disclaimer & Ethics Statement)
            </h1>
            <p className="text-xs text-gray-500 mt-1">पार्थ न्यूज़ डिजिटल मीडिया सत्यनिष्ठा विवरणी</p>
          </div>

          <div className="prose prose-amber text-xs sm:text-sm text-gray-700 font-hindi space-y-4 leading-relaxed">
            <p>
              पार्थ न्यूज़ द्वारा प्रकाशित समाचार, ग्राउंड रिपोर्ट एवं विचार पूर्ण निष्पक्षता और तथ्यों की पुष्टि के उपरांत ही प्रसारित किए जाते हैं। 
            </p>

            <h3 className="text-base font-bold text-gray-900">संपादकीय एवं स्तंभकारों के विचार</h3>
            <p>
              'संपादकीय एवं विचार' श्रेणी में प्रकाशित आलेखों में व्यक्त विचार संबंधित लेखक के निजी विचार हैं। पार्थ न्यूज़ संस्थान का उनसे पूर्णतः सहमत होना आवश्यक नहीं है।
            </p>

            <h3 className="text-base font-bold text-gray-900">त्रुटि सुधार नीति (Correction Policy)</h3>
            <p>
              यदि किसी प्रकाशित खबर में तथ्यात्मक त्रुटि पाई जाती है, तो हमारे संज्ञान में आने पर उसे तत्काल सुधारा जाता है। पाठक अपनी आपत्ति या सुधार हेतु <strong>hemanttcreates1226@gmail.com</strong> पर संपर्क कर सकते हैं।
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
