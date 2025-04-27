import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-minnie-purple to-minnie-blue bg-clip-text text-transparent mb-4">
            About Minniemissions
          </h1>
          <p className="text-lg text-gray-600">Empowering fans through web3 rewards</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <div className="rounded-full overflow-hidden aspect-square">
                  <img 
                    src="/lovable-uploads/57da0736-da7d-4394-9d03-06ad41f3acc8.png" 
                    alt="Dr Adaku Agwunobi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Meet Dr Adaku Agwunobi</h2>
                <p className="text-gray-600 mb-4">
                  As a singer/songwriter, I've been blessed with the most amazing fans who have supported my musical journey every step of the way. Their dedication and enthusiasm have been the driving force behind my success, and I've always wanted to find a meaningful way to give back to this incredible community.
                </p>
                <p className="text-gray-600 mb-4">
                  That's why I created Minniemissions - a revolutionary web3 platform powered by Polkadot that allows me to reward my fans for their loyalty and engagement. It's more than just a rewards program; it's a way to build deeper connections with my supporters and create a vibrant community of music lovers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To create a dynamic ecosystem where fans are recognized and rewarded for their support, while building a stronger, more engaged community around independent music and web3 technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Why Web3?</h3>
              <p className="text-gray-600">
                Web3 technology, particularly through Polkadot's ecosystem, enables us to create transparent, secure, and innovative ways to reward fan engagement. It's about empowering fans and creating genuine value for their support.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Community & Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img 
                  src="/lovable-uploads/7b10f320-72bb-473b-a224-40f304320ec2.png"
                  alt="Performance with dancers in colorful costumes"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <img 
                  src="/lovable-uploads/a70206d5-1609-44f7-8cd2-682d1b5135a4.png"
                  alt="Team wearing Vibes with Dr Adaku shirts"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <img 
                  src="/lovable-uploads/a5d49ad8-2888-4bc4-8329-8855180bfe43.png"
                  alt="Fans enjoying at an event"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
              </div>
              <div>
                <img 
                  src="/lovable-uploads/d0ac1ad6-bb54-4caa-8ba4-7ff359be8e20.png"
                  alt="Group photo with fans"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <img 
                  src="/lovable-uploads/7fc1fbd8-0dcd-40f4-81f5-e547273eebcc.png"
                  alt="Performance with ballet dancers"
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <p className="text-gray-600 mt-4">
                  Join our vibrant community of music lovers and be part of something special. From live performances to meet-and-greets, we're creating unforgettable moments together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
