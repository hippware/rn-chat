#import "ViewController.h"
#import "CustomAnnotation.h"
@import Mapbox;

@implementation ViewController {
  NSDictionary *views;
}

-(id)init {
  self = [super init];
  [MGLAccountManager setAccessToken:@"pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA"];
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  MGLMapView *mapView = [[MGLMapView alloc] initWithFrame:self.view.bounds];
  mapView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  mapView.styleURL = [MGLStyle darkStyleURLWithVersion:9];
  mapView.tintColor = [UIColor lightGrayColor];
  mapView.centerCoordinate = CLLocationCoordinate2DMake(0, 66);
  mapView.zoomLevel = 2;
  mapView.delegate = self;
  [self.view addSubview:mapView];
  
  
  CLLocationCoordinate2D coordinate = CLLocationCoordinate2DMake(0, 66);
  // Use the point annotation’s longitude value (as a string) as the reuse identifier for its view.
  NSString *reuseIdentifier = [NSString stringWithFormat:@"%f.%f", coordinate.longitude, coordinate.latitude];
  CustomAnnotation *annotationView = [[CustomAnnotation alloc] initWithReuseIdentifier:reuseIdentifier];
  CGFloat hue = (CGFloat)annotationView.coordinate.longitude / 100;
  annotationView.backgroundColor = [UIColor colorWithHue:hue saturation:0.5 brightness:1 alpha:1];
  views = @{reuseIdentifier: annotationView};
  annotationView.map = mapView;
  [mapView addAnnotation:views[reuseIdentifier]];
}

#pragma mark - MGLMapViewDelegate methods

// This delegate method is where you tell the map to load a view for a specific annotation. To load a static MGLAnnotationImage, you would use `-mapView:imageForAnnotation:`.
- (MGLAnnotationView *)mapView:(MGLMapView *)mapView viewForAnnotation:(id <MGLAnnotation>)annotation {
  // Use the point annotation’s longitude value (as a string) as the reuse identifier for its view.
  NSString *reuseIdentifier = [NSString stringWithFormat:@"%f.%f", annotation.coordinate.longitude, annotation.coordinate.latitude];
  
  // For better performance, always try to reuse existing annotations.
  CustomAnnotation *annotationView = [mapView dequeueReusableAnnotationViewWithIdentifier:reuseIdentifier];
  
  // If there’s no reusable annotation view available, initialize a new one.
  if (!annotationView) {
    annotationView = views[reuseIdentifier];
  }
  
  return annotationView;
}

- (BOOL)mapView:(MGLMapView *)mapView annotationCanShowCallout:(id<MGLAnnotation>)annotation {
  return YES;
}

@end