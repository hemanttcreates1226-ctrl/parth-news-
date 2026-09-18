import React from 'react';
import { Shield, Target, Eye, Award, CheckCircle2, MapPin, Users, HeartHandshake, UserCheck, Phone } from 'lucide-react';
import { ParthNewsLogo } from '../../components/common/ParthNewsLogo';
import { db } from '../../services/db';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const settings = db.getSettings();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl text-center space-y-4">
        <div className="flex justify-center">
          <ParthNewsLogo variant="full" size="lg" />
        </div>
        
        <div className="font-hindi text-xl sm:text-2xl font-black text-[#C8102E] pt-2">
          "सच के साथ, एक कदम आगे"
        </div>

        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-hindi leading-relaxed">
          पार्थ न्यूज़ उत्तर प्रदेश, प्रयागराज और राष्ट्रीय स्तर पर सक्रिय एक स्वतंत्र, निर्भीक और सत्यनिष्ठ डिजिटल न्यूज़ मीडिया संस्थान है। हमारा उद्देश्य आम जनता की आवाज़ को बिना किसी दबाव या पक्षपात के प्रस्तुत करना है।
        </p>
      </div>

      {/* Core Values 3-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#C8102E] flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-hindi text-gray-900">सत्य एवं निष्पक्षता (Truth & Integrity)</h3>
          <p className="text-xs sm:text-sm text-gray-600 font-hindi leading-relaxed">
            प्रत्येक समाचार का तथ्यों के आधार पर निष्पक्ष परीक्षण करना और सनसनीखेज पत्रकारिता से दूर रहकर केवल प्रामाणिक सूचनाएं प्रसारित करना।
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
            <Target className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-bold font-hindi text-gray-900">ज़मीनी पत्रकारिता (Ground Zero Reporting)</h3>
          <p className="text-xs sm:text-sm text-gray-600 font-hindi leading-relaxed">
            गांवों, कस्बों और जनपदों के दूरदराज क्षेत्रों से संवाददाताओं के व्यापक नेटवर्क के माध्यम से जनता की समस्याओं को उठाना।
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-hindi text-gray-900">डिजिटल पारदर्शिता (Digital Transparency)</h3>
          <p className="text-xs sm:text-sm text-gray-600 font-hindi leading-relaxed">
            संवाददाताओं के डिजिटल आईडी कार्ड, क्यूआर वेरिफिकेशन एवं उच्च गुणवत्ता वाली वीडियो पत्रकारिता के साथ आधुनिक तकनीकों का समावेश।
          </p>
        </div>
      </div>

      {/* Editorial Mission & Vision */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-black font-hindi text-gray-900 border-l-4 border-[#C8102E] pl-3">
          हमारा मिशन और विज़न (Our Mission & Vision)
        </h2>

        <div className="space-y-4 text-sm text-gray-700 font-hindi leading-relaxed">
          <p>
            आज के डिजिटल युग में फेक न्यूज़ और भ्रामक जानकारियों की बाढ़ के बीच <strong>पार्थ न्यूज़</strong> एक विश्वसनीय प्रकाश स्तंभ के रूप में कार्य करता है। हम केवल समाचार प्रसारित नहीं करते, बल्कि जनहित से जुड़े मुद्दों पर गहराई से पड़ताल कर समाधान की दिशा में सार्थक संवाद स्थापित करते हैं।
          </p>
          <p>
            हमारा विज़न देश के प्रत्येक नागरिक तक त्वरित, सटीक और प्रमाणित सूचनाएं पहुंचाना है, जिससे एक जागरूक और सशक्त समाज का निर्माण हो सके।
          </p>
        </div>

        {/* Leadership & Headquarters Details */}
        <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-red-50/70 p-5 rounded-2xl border border-red-100 space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <UserCheck className="w-5 h-5 text-[#C8102E]" />
              <span>चैनल हेड (Channel Head)</span>
            </div>
            <p className="text-gray-900 font-bold text-lg font-hindi text-[#C8102E]">
              {settings.channelHead || 'राजीव राय'}
            </p>
            <div className="flex items-center gap-1.5 text-gray-700 font-hindi text-xs pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>मो. नं. (Mob): </span>
              <a href={`tel:${settings.contactPhone}`} className="font-bold text-gray-900 hover:text-[#C8102E]">
                {settings.contactPhone}
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <MapPin className="w-5 h-5 text-[#C8102E]" />
              <span>कार्यालय पता (Office Address)</span>
            </div>
            <p className="text-gray-800 font-hindi leading-relaxed text-xs">
              {settings.address}
            </p>
            <p className="text-gray-500 font-hindi text-[11px] pt-1">
              पार्थ न्यूज़ डिजिटल मीडिया नेटवर्क
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
