//
//  Shared.h
//  SignAndVerify
//
//  Created by Ricci Adams on 2014-07-20.
//
//

#import <Foundation/Foundation.h>

extern NSData *GetSHA1Hash(NSData *inData);
extern NSData *GetSHA256Hash(NSData *inData);

extern NSString *GetHexStringWithData(NSData *data);
extern NSData   *GetDataWithHexString(NSString *inputString);



@interface Verifier : NSObject

+(BOOL)verifyContent:(NSData *)content publicKeyPath:(NSString*) publicKeyPath signature:(NSData *)signature;

- (id) initWithContentsOfFile:(NSString *)path tag:(NSString *)tag;

- (BOOL) verifySHA1Hash:(NSData *)hash   withSignature:(NSData *)signature;
- (BOOL) verifySHA256Hash:(NSData *)hash withSignature:(NSData *)signature;

@end
