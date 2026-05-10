import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Levels = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const response = await axios.get('/api/levels');
      if (response.data.success) {
        setLevels(response.data.data);
      }
    } catch (err) {
      setError('فشل في تحميل المستويات');
      console.error('Error fetching levels:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المستويات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">المسارات التدريبية</h1>
        <p className="text-gray-600">اختر المستوى المناسب لمهاراتك وابدأ رحلتك في البرمجة التنافسية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <div key={level.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{level.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  المستوى {level.order}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{level.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">التقييم المطلوب:</span>
                  <span className="font-medium">{level.min_rating} - {level.max_rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">نقاط الخبرة:</span>
                  <span className="font-medium">{level.required_xp} XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">عدد الدروس:</span>
                  <span className="font-medium">{level.lessons?.length || 0}</span>
                </div>
              </div>

              <Link
                to={`/levels/${level.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center block"
              >
                ابدأ التعلم
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;